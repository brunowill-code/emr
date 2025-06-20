--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: evitar_nulo_depois_de_preenchido(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.evitar_nulo_depois_de_preenchido() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Verifica se algum campo antes preenchido est├í tentando voltar a NULL
    IF (OLD.cid IS NOT NULL AND NEW.cid IS NULL) OR
       (OLD.anamnese IS NOT NULL AND NEW.anamnese IS NULL) OR
       (OLD.observacoes IS NOT NULL AND NEW.observacoes IS NULL) OR
       (OLD.diagnostico IS NOT NULL AND NEW.diagnostico IS NULL) THEN
        RAISE EXCEPTION 'Campos preenchidos n├úo podem voltar a ser nulos!';
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.evitar_nulo_depois_de_preenchido() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: agenda_base; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agenda_base (
    data date,
    hora time without time zone,
    dia_semana text
);


ALTER TABLE public.agenda_base OWNER TO postgres;

--
-- Name: agenda_paciente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agenda_paciente (
    id_agenda_paciente integer NOT NULL,
    hora_inicio time with time zone NOT NULL,
    hora_fim time with time zone NOT NULL,
    dias_semana integer[]
);


ALTER TABLE public.agenda_paciente OWNER TO postgres;

--
-- Name: agenda_paciente_id_agenda_paciente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agenda_paciente_id_agenda_paciente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agenda_paciente_id_agenda_paciente_seq OWNER TO postgres;

--
-- Name: agenda_paciente_id_agenda_paciente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agenda_paciente_id_agenda_paciente_seq OWNED BY public.agenda_paciente.id_agenda_paciente;


--
-- Name: agenda_profissional; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agenda_profissional (
    id_agenda_profissional integer NOT NULL,
    hora_inicio time with time zone NOT NULL,
    hora_fim time with time zone NOT NULL,
    dias_semana integer[]
);


ALTER TABLE public.agenda_profissional OWNER TO postgres;

--
-- Name: agenda_profissional_id_agenda_profissional_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agenda_profissional_id_agenda_profissional_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agenda_profissional_id_agenda_profissional_seq OWNER TO postgres;

--
-- Name: agenda_profissional_id_agenda_profissional_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agenda_profissional_id_agenda_profissional_seq OWNED BY public.agenda_profissional.id_agenda_profissional;


--
-- Name: agendamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agendamento (
    id_agendamento integer NOT NULL,
    id_profissional_de_saude integer NOT NULL,
    id_paciente integer NOT NULL,
    data_agendamento date,
    hora_agendamento time with time zone,
    status character varying(200) NOT NULL
);


ALTER TABLE public.agendamento OWNER TO postgres;

--
-- Name: agendamento_id_agendamento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agendamento_id_agendamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agendamento_id_agendamento_seq OWNER TO postgres;

--
-- Name: agendamento_id_agendamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agendamento_id_agendamento_seq OWNED BY public.agendamento.id_agendamento;


--
-- Name: atestado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.atestado (
    id_atestado integer NOT NULL,
    atestado text
);


ALTER TABLE public.atestado OWNER TO postgres;

--
-- Name: atestado_id_atestado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.atestado_id_atestado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.atestado_id_atestado_seq OWNER TO postgres;

--
-- Name: atestado_id_atestado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.atestado_id_atestado_seq OWNED BY public.atestado.id_atestado;


--
-- Name: consulta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consulta (
    id_consulta integer NOT NULL,
    id_prontuario integer NOT NULL,
    id_profissional integer NOT NULL,
    data_consulta timestamp without time zone DEFAULT now(),
    subjetivo text,
    objetivo text,
    avaliacao text,
    plano text,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_agendamento integer,
    hora_consulta time with time zone,
    id_atestado integer,
    id_exame integer,
    id_prescricao integer
);


ALTER TABLE public.consulta OWNER TO postgres;

--
-- Name: consulta_id_consulta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consulta_id_consulta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.consulta_id_consulta_seq OWNER TO postgres;

--
-- Name: consulta_id_consulta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consulta_id_consulta_seq OWNED BY public.consulta.id_consulta;


--
-- Name: especialidade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.especialidade (
    id_especialidade integer NOT NULL,
    tipo_especialidade character varying NOT NULL
);


ALTER TABLE public.especialidade OWNER TO postgres;

--
-- Name: exame_emcaminhamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exame_emcaminhamento (
    id_exame integer NOT NULL,
    exame text
);


ALTER TABLE public.exame_emcaminhamento OWNER TO postgres;

--
-- Name: exame_emcaminhamento_id_exame_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exame_emcaminhamento_id_exame_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exame_emcaminhamento_id_exame_seq OWNER TO postgres;

--
-- Name: exame_emcaminhamento_id_exame_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exame_emcaminhamento_id_exame_seq OWNED BY public.exame_emcaminhamento.id_exame;


--
-- Name: paciente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paciente (
    id_paciente integer NOT NULL,
    id_usuario integer NOT NULL,
    id_agenda_paciente integer
);


ALTER TABLE public.paciente OWNER TO postgres;

--
-- Name: paciente_id_paciente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.paciente_id_paciente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.paciente_id_paciente_seq OWNER TO postgres;

--
-- Name: paciente_id_paciente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paciente_id_paciente_seq OWNED BY public.paciente.id_paciente;


--
-- Name: perfil_acesso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfil_acesso (
    id_perfil_acess integer NOT NULL,
    type_acess character varying(200) NOT NULL
);


ALTER TABLE public.perfil_acesso OWNER TO postgres;

--
-- Name: perfil_acesso_id_perfil_acess_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfil_acesso_id_perfil_acess_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.perfil_acesso_id_perfil_acess_seq OWNER TO postgres;

--
-- Name: perfil_acesso_id_perfil_acess_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfil_acesso_id_perfil_acess_seq OWNED BY public.perfil_acesso.id_perfil_acess;


--
-- Name: prescricao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prescricao (
    id_prescricao integer NOT NULL,
    prescricao text
);


ALTER TABLE public.prescricao OWNER TO postgres;

--
-- Name: prescricao_id_prescricao_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prescricao_id_prescricao_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prescricao_id_prescricao_seq OWNER TO postgres;

--
-- Name: prescricao_id_prescricao_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prescricao_id_prescricao_seq OWNED BY public.prescricao.id_prescricao;


--
-- Name: profissional_de_saude; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profissional_de_saude (
    id_profissional_de_saude integer NOT NULL,
    crm character varying NOT NULL,
    id_especialidade integer,
    id_usuario integer,
    id_agenda_profissional integer
);


ALTER TABLE public.profissional_de_saude OWNER TO postgres;

--
-- Name: profissional_de_saude_id_profissional_de_saude_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profissional_de_saude_id_profissional_de_saude_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profissional_de_saude_id_profissional_de_saude_seq OWNER TO postgres;

--
-- Name: profissional_de_saude_id_profissional_de_saude_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profissional_de_saude_id_profissional_de_saude_seq OWNED BY public.profissional_de_saude.id_profissional_de_saude;


--
-- Name: prontuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prontuario (
    id_prontuario integer NOT NULL,
    id_paciente integer NOT NULL
);


ALTER TABLE public.prontuario OWNER TO postgres;

--
-- Name: prontuario_id_prontuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prontuario_id_prontuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prontuario_id_prontuario_seq OWNER TO postgres;

--
-- Name: prontuario_id_prontuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prontuario_id_prontuario_seq OWNED BY public.prontuario.id_prontuario;


--
-- Name: soap; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.soap (
    id integer NOT NULL,
    id_consulta integer,
    subjetivo jsonb,
    objetivo jsonb,
    avaliacao jsonb,
    plano jsonb,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.soap OWNER TO postgres;

--
-- Name: soap_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.soap_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.soap_id_seq OWNER TO postgres;

--
-- Name: soap_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.soap_id_seq OWNED BY public.soap.id;


--
-- Name: solicitacoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitacoes (
    id_solicitacao integer NOT NULL,
    id_paciente integer NOT NULL,
    id_especialidade integer NOT NULL,
    id_profissional_de_saude integer,
    data_solicitacao date NOT NULL,
    status character varying(200) DEFAULT 'Pendente'::character varying,
    resposta character varying(1000)
);


ALTER TABLE public.solicitacoes OWNER TO postgres;

--
-- Name: solicitacoes_id_solicitacao_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitacoes_id_solicitacao_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.solicitacoes_id_solicitacao_seq OWNER TO postgres;

--
-- Name: solicitacoes_id_solicitacao_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitacoes_id_solicitacao_seq OWNED BY public.solicitacoes.id_solicitacao;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nome_usuario character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    id_perfil_acesso integer,
    senha character varying(500) NOT NULL,
    cpf character varying(100) NOT NULL,
    profile_completed boolean DEFAULT false
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_id_usuario_seq OWNER TO postgres;

--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- Name: agenda_paciente id_agenda_paciente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agenda_paciente ALTER COLUMN id_agenda_paciente SET DEFAULT nextval('public.agenda_paciente_id_agenda_paciente_seq'::regclass);


--
-- Name: agenda_profissional id_agenda_profissional; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agenda_profissional ALTER COLUMN id_agenda_profissional SET DEFAULT nextval('public.agenda_profissional_id_agenda_profissional_seq'::regclass);


--
-- Name: agendamento id_agendamento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamento ALTER COLUMN id_agendamento SET DEFAULT nextval('public.agendamento_id_agendamento_seq'::regclass);


--
-- Name: atestado id_atestado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atestado ALTER COLUMN id_atestado SET DEFAULT nextval('public.atestado_id_atestado_seq'::regclass);


--
-- Name: consulta id_consulta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consulta ALTER COLUMN id_consulta SET DEFAULT nextval('public.consulta_id_consulta_seq'::regclass);


--
-- Name: exame_emcaminhamento id_exame; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exame_emcaminhamento ALTER COLUMN id_exame SET DEFAULT nextval('public.exame_emcaminhamento_id_exame_seq'::regclass);


--
-- Name: paciente id_paciente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paciente ALTER COLUMN id_paciente SET DEFAULT nextval('public.paciente_id_paciente_seq'::regclass);


--
-- Name: perfil_acesso id_perfil_acess; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_acesso ALTER COLUMN id_perfil_acess SET DEFAULT nextval('public.perfil_acesso_id_perfil_acess_seq'::regclass);


--
-- Name: prescricao id_prescricao; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescricao ALTER COLUMN id_prescricao SET DEFAULT nextval('public.prescricao_id_prescricao_seq'::regclass);


--
-- Name: profissional_de_saude id_profissional_de_saude; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profissional_de_saude ALTER COLUMN id_profissional_de_saude SET DEFAULT nextval('public.profissional_de_saude_id_profissional_de_saude_seq'::regclass);


--
-- Name: prontuario id_prontuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prontuario ALTER COLUMN id_prontuario SET DEFAULT nextval('public.prontuario_id_prontuario_seq'::regclass);


--
-- Name: soap id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.soap ALTER COLUMN id SET DEFAULT nextval('public.soap_id_seq'::regclass);


--
-- Name: solicitacoes id_solicitacao; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitacoes ALTER COLUMN id_solicitacao SET DEFAULT nextval('public.solicitacoes_id_solicitacao_seq'::regclass);


--
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- Name: agenda_paciente agenda_paciente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agenda_paciente
    ADD CONSTRAINT agenda_paciente_pkey PRIMARY KEY (id_agenda_paciente);


--
-- Name: agenda_profissional agenda_profissional_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agenda_profissional
    ADD CONSTRAINT agenda_profissional_pkey PRIMARY KEY (id_agenda_profissional);


--
-- Name: agendamento agendamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT agendamento_pkey PRIMARY KEY (id_agendamento);


--
-- Name: atestado atestado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atestado
    ADD CONSTRAINT atestado_pkey PRIMARY KEY (id_atestado);


--
-- Name: consulta consulta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT consulta_pkey PRIMARY KEY (id_consulta);


--
-- Name: especialidade especialidade_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.especialidade
    ADD CONSTRAINT especialidade_pkey PRIMARY KEY (id_especialidade);


--
-- Name: exame_emcaminhamento exame_emcaminhamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exame_emcaminhamento
    ADD CONSTRAINT exame_emcaminhamento_pkey PRIMARY KEY (id_exame);


--
-- Name: paciente paciente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_pkey PRIMARY KEY (id_paciente);


--
-- Name: perfil_acesso perfil_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_acesso
    ADD CONSTRAINT perfil_unique PRIMARY KEY (id_perfil_acess);


--
-- Name: prescricao prescricao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescricao
    ADD CONSTRAINT prescricao_pkey PRIMARY KEY (id_prescricao);


--
-- Name: profissional_de_saude profissional_de_saude_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profissional_de_saude
    ADD CONSTRAINT profissional_de_saude_pkey PRIMARY KEY (id_profissional_de_saude);


--
-- Name: prontuario prontuario_id_paciente_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prontuario
    ADD CONSTRAINT prontuario_id_paciente_key UNIQUE (id_paciente);


--
-- Name: prontuario prontuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prontuario
    ADD CONSTRAINT prontuario_pkey PRIMARY KEY (id_prontuario);


--
-- Name: soap soap_id_consulta_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.soap
    ADD CONSTRAINT soap_id_consulta_key UNIQUE (id_consulta);


--
-- Name: soap soap_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.soap
    ADD CONSTRAINT soap_pkey PRIMARY KEY (id);


--
-- Name: solicitacoes solicitacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitacoes
    ADD CONSTRAINT solicitacoes_pkey PRIMARY KEY (id_solicitacao);


--
-- Name: agendamento unico_agendamento; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT unico_agendamento UNIQUE (id_profissional_de_saude, id_paciente, data_agendamento, hora_agendamento);


--
-- Name: profissional_de_saude unico_crm; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profissional_de_saude
    ADD CONSTRAINT unico_crm UNIQUE (crm);


--
-- Name: especialidade unico_tipo_especialidade; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.especialidade
    ADD CONSTRAINT unico_tipo_especialidade UNIQUE (tipo_especialidade);


--
-- Name: profissional_de_saude unico_usuario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profissional_de_saude
    ADD CONSTRAINT unico_usuario UNIQUE (id_usuario);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- Name: usuario usuario_unico; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_unico UNIQUE (email, cpf);


--
-- Name: consulta consulta_id_prontuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT consulta_id_prontuario_fkey FOREIGN KEY (id_prontuario) REFERENCES public.prontuario(id_prontuario) ON DELETE CASCADE;


--
-- Name: paciente fk_agenda_paciente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT fk_agenda_paciente FOREIGN KEY (id_agenda_paciente) REFERENCES public.agenda_paciente(id_agenda_paciente);


--
-- Name: profissional_de_saude fk_agenda_profissional; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profissional_de_saude
    ADD CONSTRAINT fk_agenda_profissional FOREIGN KEY (id_agenda_profissional) REFERENCES public.agenda_profissional(id_agenda_profissional);


--
-- Name: consulta fk_agendamento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT fk_agendamento FOREIGN KEY (id_agendamento) REFERENCES public.agendamento(id_agendamento);


--
-- Name: consulta fk_atestado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT fk_atestado FOREIGN KEY (id_atestado) REFERENCES public.atestado(id_atestado) ON DELETE SET NULL;


--
-- Name: profissional_de_saude fk_especialidade; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profissional_de_saude
    ADD CONSTRAINT fk_especialidade FOREIGN KEY (id_especialidade) REFERENCES public.especialidade(id_especialidade) NOT VALID;


--
-- Name: solicitacoes fk_especialidade_solicitacoes; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitacoes
    ADD CONSTRAINT fk_especialidade_solicitacoes FOREIGN KEY (id_especialidade) REFERENCES public.especialidade(id_especialidade) NOT VALID;


--
-- Name: consulta fk_exame; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT fk_exame FOREIGN KEY (id_exame) REFERENCES public.exame_emcaminhamento(id_exame) ON DELETE SET NULL;


--
-- Name: agendamento fk_paciente_agendamento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT fk_paciente_agendamento FOREIGN KEY (id_paciente) REFERENCES public.paciente(id_paciente) NOT VALID;


--
-- Name: solicitacoes fk_paciente_solicitacoes; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitacoes
    ADD CONSTRAINT fk_paciente_solicitacoes FOREIGN KEY (id_paciente) REFERENCES public.paciente(id_paciente) NOT VALID;


--
-- Name: paciente fk_paciente_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT fk_paciente_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) NOT VALID;


--
-- Name: consulta fk_prescricao; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT fk_prescricao FOREIGN KEY (id_prescricao) REFERENCES public.prescricao(id_prescricao) ON DELETE SET NULL;


--
-- Name: consulta fk_profissional; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT fk_profissional FOREIGN KEY (id_profissional) REFERENCES public.profissional_de_saude(id_profissional_de_saude);


--
-- Name: agendamento fk_profissional_de_saude_agendamento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT fk_profissional_de_saude_agendamento FOREIGN KEY (id_profissional_de_saude) REFERENCES public.profissional_de_saude(id_profissional_de_saude) NOT VALID;


--
-- Name: profissional_de_saude fk_profissional_de_saude_especialidade; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profissional_de_saude
    ADD CONSTRAINT fk_profissional_de_saude_especialidade FOREIGN KEY (id_especialidade) REFERENCES public.especialidade(id_especialidade) NOT VALID;


--
-- Name: profissional_de_saude fk_profissional_de_saude_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profissional_de_saude
    ADD CONSTRAINT fk_profissional_de_saude_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) NOT VALID;


--
-- Name: solicitacoes fk_profissional_solicitacoes; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitacoes
    ADD CONSTRAINT fk_profissional_solicitacoes FOREIGN KEY (id_profissional_de_saude) REFERENCES public.profissional_de_saude(id_profissional_de_saude) NOT VALID;


--
-- Name: usuario fk_usuario_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_usuario_perfil FOREIGN KEY (id_perfil_acesso) REFERENCES public.perfil_acesso(id_perfil_acess) NOT VALID;


--
-- PostgreSQL database dump complete
--

