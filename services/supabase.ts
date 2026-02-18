
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzxiysvgpdivpckygiqp.supabase.co';
const supabaseKey = 'sb_publishable_-3SJM1u4uF1mdw4AWxpQug_2Y1Y7win';

export const supabase = createClient(supabaseUrl, supabaseKey);
