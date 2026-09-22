-- ==============================================================================
-- Portafolio Johan Benítez — Supabase PostgreSQL Schema & RLS Policies
-- Conforme a: supabase-postgres-best-practices, EU AI Act Art. 14, Clean Architecture
-- ==============================================================================

-- 1. Tabla: visitor_telemetry
CREATE TABLE IF NOT EXISTS public.visitor_telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    path TEXT NOT NULL,
    space_code TEXT,
    action_type TEXT NOT NULL,
    metadata JSONB
);

-- Índices optimizados para consultas temporales y de rutas
CREATE INDEX IF NOT EXISTS idx_visitor_telemetry_created_at 
    ON public.visitor_telemetry (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_visitor_telemetry_space_code 
    ON public.visitor_telemetry (space_code) 
    WHERE space_code IS NOT NULL;

-- 2. Tabla: contact_messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    message TEXT NOT NULL,
    topic TEXT
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at 
    ON public.contact_messages (created_at DESC);

-- 3. Tabla: agent_execution_traces
CREATE TABLE IF NOT EXISTS public.agent_execution_traces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    agent_name TEXT NOT NULL,
    kind TEXT NOT NULL,
    status TEXT NOT NULL,
    step_count INTEGER NOT NULL DEFAULT 0,
    last_action TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_agent_traces_created_at 
    ON public.agent_execution_traces (created_at DESC);

-- ==============================================================================
-- Habilitación de Row Level Security (RLS) en todas las tablas
-- ==============================================================================

ALTER TABLE public.visitor_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_execution_traces ENABLE ROW LEVEL SECURITY;

-- Políticas de Seguridad: Inserción anónima para telemetría y contacto
CREATE POLICY "Allow anonymous telemetry insert"
    ON public.visitor_telemetry
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow anonymous contact messages insert"
    ON public.contact_messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow public read of active agent traces"
    ON public.agent_execution_traces
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Sólo service_role puede leer mensajes de contacto y telemetría privada
CREATE POLICY "Allow service role full access to visitor telemetry"
    ON public.visitor_telemetry
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow service role full access to contact messages"
    ON public.contact_messages
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow service role full access to agent traces"
    ON public.agent_execution_traces
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
