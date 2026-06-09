-- ============================================
-- Personal AI Umrah CRM - Supabase Schema
-- ============================================

-- 1. LEADS TABLE
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  package_interest TEXT,
  source TEXT NOT NULL CHECK (source IN ('meta_ads', 'alumni', 'referral', 'manual_input')),
  status TEXT NOT NULL DEFAULT 'new_lead' CHECK (status IN ('new_lead', 'contacted', 'interested', 'waiting_decision', 'dp_paid', 'closed', 'departed', 'alumni')),
  notes TEXT,
  last_contact TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_user ON leads(user_id);
CREATE INDEX idx_leads_next_followup ON leads(next_followup_at);

-- 2. MESSAGES TABLE
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('incoming', 'outgoing')),
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'document', 'template')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_lead ON messages(lead_id);

-- 3. FOLLOWUPS TABLE
CREATE TABLE followups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'skipped')),
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_followups_lead ON followups(lead_id);
CREATE INDEX idx_followups_scheduled ON followups(scheduled_at);
CREATE INDEX idx_followups_status ON followups(status);

-- 4. ALUMNI TABLE
CREATE TABLE alumni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  departure_year INTEGER,
  package_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_alumni_user ON alumni(user_id);

-- 5. SALES TARGETS TABLE
CREATE TABLE sales_targets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month TEXT NOT NULL,
  target INTEGER NOT NULL DEFAULT 10,
  actual INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  UNIQUE(month, user_id)
);

-- 6. CAMPAIGNS TABLE
CREATE TABLE campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  template_type TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  message_template TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'scheduled')),
  sent_count INTEGER DEFAULT 0,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- ============================================
-- AUTO-UPDATE UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE followups ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY user_isolation_leads ON leads
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_isolation_messages ON messages
  FOR ALL USING (
    EXISTS (SELECT 1 FROM leads WHERE leads.id = messages.lead_id AND leads.user_id = auth.uid())
  );
CREATE POLICY user_isolation_followups ON followups
  FOR ALL USING (
    EXISTS (SELECT 1 FROM leads WHERE leads.id = followups.lead_id AND leads.user_id = auth.uid())
  );
CREATE POLICY user_isolation_alumni ON alumni
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_isolation_targets ON sales_targets
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_isolation_campaigns ON campaigns
  FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- AUTO FOLLOW-UP GENERATION FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION auto_generate_followups()
RETURNS TRIGGER AS $$
BEGIN
  -- When a lead is created, schedule first follow-up in 2 days
  IF TG_OP = 'INSERT' THEN
    INSERT INTO followups (lead_id, scheduled_at, status, notes)
    VALUES (NEW.id, NOW() + INTERVAL '2 days', 'pending', 'Auto: Initial follow-up');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_auto_followup
  AFTER INSERT ON leads
  FOR EACH ROW EXECUTE FUNCTION auto_generate_followups();
