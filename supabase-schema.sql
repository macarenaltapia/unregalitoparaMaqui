-- Tabla de contribuciones de ESTA pagina (separada de la de Lu).
-- Si cambias el nombre, actualizalo tambien en CONTRIBUTIONS_TABLE (src/data/config.ts).
CREATE TABLE contributions_maqui (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  message TEXT DEFAULT '',
  transferred BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE contributions_maqui ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT desde anon
CREATE POLICY "Allow anonymous inserts"
  ON contributions_maqui
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Permitir SELECT desde anon
CREATE POLICY "Allow anonymous reads"
  ON contributions_maqui
  FOR SELECT
  TO anon
  USING (true);
