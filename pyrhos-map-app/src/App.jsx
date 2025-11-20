import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, Terminal, Globe, Wifi, Eye, Activity, 
  Server, Database, Target, FileCode, 
  Ghost, Layout, ChevronRight, ZoomIn, ZoomOut, Move,
  List, Command, Cpu, Lock, Key
} from 'lucide-react';

// --- DATOS EXPANDIDOS: NIVEL TÁCTICO (PASOS) ---
const initialData = {
  id: 'root',
  label: 'Pyrhos Wiki',
  type: 'root',
  icon: 'Ghost',
  children: [
    {
      id: 'fundamentos',
      label: '01_Fundamentos',
      type: 'section',
      icon: 'Shield',
      children: [
        { 
          id: 'f1', label: 'Threat Modeling', type: 'topic',
          children: [
            { id: 'f1-1', label: '1. Identificar Activos' },
            { id: 'f1-2', label: '2. Diagrama de Flujo (DFD)' },
            { id: 'f1-3', label: '3. Metodología STRIDE' }
          ]
        },
        { 
          id: 'f2', label: 'Criptografía', type: 'topic',
          children: [
            { id: 'f2-1', label: 'Simétrica (AES/ChaCha)' },
            { id: 'f2-2', label: 'Asimétrica (RSA/ECC)' },
            { id: 'f2-3', label: 'Hashing & Salting' }
          ]
        },
        { id: 'f3', label: 'Zero Trust', type: 'topic', children: [{id:'f3-1', label: 'Principios'}, {id:'f3-2', label: 'Micro-segmentación'}] }
      ]
    },
    {
      id: 'linux',
      label: '02_Linux_Systems',
      type: 'section',
      icon: 'Terminal',
      children: [
        { 
          id: 'l1', label: 'Hardening', type: 'topic',
          children: [
            { id: 'l1-1', label: 'SSH Config & Keys' },
            { id: 'l1-2', label: 'Firewall (UFW/NFTables)' },
            { id: 'l1-3', label: 'Fail2Ban & Auditd' }
          ]
        },
        { 
          id: 'l2', label: 'PrivEsc', type: 'topic',
          children: [
            { id: 'l2-1', label: 'Enum (LinPEAS)' },
            { id: 'l2-2', label: 'Exploit SUID/GUID' },
            { id: 'l2-3', label: 'Abuso de Cron Jobs' },
            { id: 'l2-4', label: 'Kernel Exploits (DirtyPipe)' }
          ]
        },
        { id: 'l3', label: 'Bash Ops', type: 'topic', children: [{id:'l3-1', label: 'One-liners'}, {id:'l3-2', label: 'Automation'}] }
      ]
    },
    {
      id: 'redes',
      label: '03_Redes',
      type: 'section',
      icon: 'Wifi',
      children: [
        { 
          id: 'n1', label: 'Protocolos Core', type: 'topic',
          children: [
            { id: 'n1-1', label: 'TCP Handshake' },
            { id: 'n1-2', label: 'ARP & DNS' },
            { id: 'n1-3', label: 'Subnetting' }
          ]
        },
        { 
          id: 'n2', label: 'Traffic Analysis', type: 'topic',
          children: [
            { id: 'n2-1', label: 'Captura (Tcpdump)' },
            { id: 'n2-2', label: 'Filtros Wireshark' },
            { id: 'n2-3', label: 'Extracción de Objetos' }
          ]
        },
        { 
          id: 'n3', label: 'Tunneling', type: 'topic',
          children: [
             { id: 'n3-1', label: 'SSH Local/Remote' },
             { id: 'n3-2', label: 'VPN over DNS/ICMP' }
          ]
        }
      ]
    },
    {
      id: 'redteam',
      label: '04_Red_Team',
      type: 'core', 
      icon: 'Target',
      collapsed: false, 
      children: [
        {
          id: 'infra',
          label: '4.1 Infraestructura',
          type: 'subsection',
          icon: 'Server',
          children: [
            { 
              id: 'inf1', label: 'Fase 1: Enumeración', type: 'process',
              children: [
                { id: 'inf1-1', label: 'Host Discovery (-sn)' },
                { id: 'inf1-2', label: 'Port Scan (-p-)' },
                { id: 'inf1-3', label: 'Service Version (-sV)' },
                { id: 'inf1-4', label: 'NSE Scripts (-sC)' }
              ]
            },
            { 
              id: 'inf2', label: 'Fase 2: Explotación', type: 'process',
              children: [
                { id: 'inf2-1', label: 'Searchsploit / CVEs' },
                { id: 'inf2-2', label: 'Password Spraying' },
                { id: 'inf2-3', label: 'Reverse Shells' }
              ]
            },
            { 
              id: 'inf3', label: 'Fase 3: Pivoting', type: 'process',
              children: [
                { id: 'inf3-1', label: 'Enumerar Interfaces' },
                { id: 'inf3-2', label: 'Chisel / Ligolo Setup' },
                { id: 'inf3-3', label: 'Proxychains Routing' }
              ]
            }
          ]
        },
        {
          id: 'web',
          label: '4.2 Web Hacking',
          type: 'subsection',
          icon: 'Globe',
          children: [
            { 
              id: 'web1', label: 'Reconocimiento', type: 'process',
              children: [
                { id: 'w1-1', label: 'Subdomain Enum' },
                { id: 'w1-2', label: 'Tech Profiling (Wappalyzer)' },
                { id: 'w1-3', label: 'Directory Fuzzing (Ffuf)' }
              ]
            },
            { 
              id: 'web2', label: 'OWASP Attacks', type: 'process',
              children: [
                { id: 'w2-1', label: 'SQL Injection (Union/Blind)' },
                { id: 'w2-2', label: 'XSS (Reflected/Stored)' },
                { id: 'w2-3', label: 'IDOR & Auth Bypass' },
                { id: 'w2-4', label: 'RCE / Command Inj' }
              ]
            }
          ]
        },
        {
          id: 'ad',
          label: '4.3 Active Directory',
          type: 'subsection',
          icon: 'Database',
          children: [
            { 
              id: 'ad1', label: 'AD Enumeration', type: 'process',
              children: [
                { id: 'ad1-1', label: 'Domain Mapping (Bloodhound)' },
                { id: 'ad1-2', label: 'User/Group Enum (LDAP)' },
                { id: 'ad1-3', label: 'Find Local Admins' }
              ]
            },
            { 
              id: 'ad2', label: 'Identity Attacks', type: 'process',
              children: [
                { id: 'ad2-1', label: 'AS-REP Roasting' },
                { id: 'ad2-2', label: 'Kerberoasting' },
                { id: 'ad2-3', label: 'Pass-the-Hash/Ticket' }
              ]
            },
            { 
              id: 'ad3', label: 'Persistencia AD', type: 'process',
              children: [
                { id: 'ad3-1', label: 'Golden Ticket' },
                { id: 'ad3-2', label: 'DCSync Attack' },
                { id: 'ad3-3', label: 'Silver Ticket' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'osint',
      label: '05_OSINT',
      type: 'section',
      icon: 'Eye',
      children: [
        { id: 'o1', label: 'Google Hacking', type: 'topic', children: [{id: 'o1-1', label: 'Filetypes'}, {id: 'o1-2', label: 'Site Operator'}] },
        { id: 'o2', label: 'Infra OSINT', type: 'topic', children: [{id: 'o2-1', label: 'Shodan/Censys'}, {id: 'o2-2', label: 'Whois/DNS'}] },
        { id: 'o3', label: 'SOCMINT', type: 'topic', children: [{id: 'o3-1', label: 'Username Checks'}, {id: 'o3-2', label: 'Metadata Analysis'}] }
      ]
    },
    {
      id: 'blue',
      label: '06_Blue_Team',
      type: 'section',
      icon: 'Activity',
      children: [
        { id: 'b1', label: 'DFIR', type: 'topic', children: [{id:'b1-1', label: 'Triage & Collection'}, {id:'b1-2', label: 'Memory Analysis'}, {id:'b1-3', label: 'Disk Forensics'}] },
        { id: 'b2', label: 'SIEM', type: 'topic', children: [{id:'b2-1', label: 'Log Ingestion'}, {id:'b2-2', label: 'Correlation Rules'}] },
        { id: 'b3', label: 'Hunting', type: 'topic', children: [{id:'b3-1', label: 'IOC Matching'}, {id:'b3-2', label: 'YARA Rules'}] }
      ]
    }
  ]
};

// --- Mapeo de Iconos ---
const IconMap = {
  Ghost, Shield, Terminal, Globe, Wifi, Eye, Activity, 
  Server, Database, Target, FileCode, Layout, List, Command, Cpu, Lock, Key
};

// --- Componente Nodo del Mapa ---
const MapNode = ({ data, depth = 0, isLast, parentX, parentY }) => {
  const [collapsed, setCollapsed] = useState(data.collapsed ?? (depth > 1)); 
  
  // Estilos para diferentes niveles de profundidad
  const getStyles = (type) => {
    switch(type) {
      case 'root': return 'bg-red-600 border-red-500 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] ring-2 ring-red-900';
      case 'core': return 'bg-slate-900 border-red-500/80 text-red-100 shadow-[0_0_15px_rgba(220,38,38,0.2)]';
      case 'section': return 'bg-slate-900 border-slate-600 text-slate-200 hover:border-slate-400';
      case 'subsection': return 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-500';
      case 'process': return 'bg-[#0f172a] border-slate-800 text-slate-300 border-l-2 border-l-blue-500'; // Nivel de pasos intermedios
      case 'topic': return 'bg-[#0f172a] border-slate-800 text-slate-300';
      default: return 'bg-transparent border-transparent text-slate-500 text-xs py-0.5 hover:text-slate-300'; // Hojas finales (Pasos)
    }
  };

  const NodeIcon = IconMap[data.icon];

  return (
    <div className="flex flex-row items-center">
      {/* El Nodo en sí */}
      <div className="flex flex-col items-start relative z-10">
        <div 
          onClick={(e) => { e.stopPropagation(); if(data.children) setCollapsed(!collapsed); }}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 cursor-pointer select-none
            hover:scale-105 active:scale-95 whitespace-nowrap
            ${getStyles(data.type)}
            ${depth === 0 ? 'text-xl font-bold px-6 py-4' : ''}
            ${depth >= 4 ? 'pl-2 pr-3 py-1 text-xs border-l border-slate-700' : 'text-sm font-medium'}
          `}
        >
          {NodeIcon && <NodeIcon className={`${depth === 0 ? 'w-6 h-6' : 'w-4 h-4'}`} />}
          <span>{data.label}</span>
          
          {data.children && (
            <div className={`ml-2 p-0.5 rounded-full bg-black/20 transition-transform ${collapsed ? '' : 'rotate-90'}`}>
              <ChevronRight className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>

      {/* Renderizado de Hijos (Rama derecha) */}
      {!collapsed && data.children && data.children.length > 0 && (
        <div className="flex flex-row items-center">
          
          {/* Línea Conectora Horizontal */}
          <div className="w-8 h-px bg-slate-700"></div>

          {/* Contenedor Vertical de Hijos */}
          <div className="flex flex-col gap-2 relative">
            {/* Línea Conectora Vertical */}
            {data.children.length > 1 && (
               <div className="absolute left-0 top-3 bottom-3 w-px bg-slate-700 -translate-x-[1px]"></div>
            )}

            {data.children.map((child, idx) => (
              <div key={idx} className="flex items-center relative py-1">
                {/* Pequeña línea horizontal */}
                <div className="w-6 h-px bg-slate-700"></div>
                
                {/* Recursividad */}
                <MapNode data={child} depth={depth + 1} isLast={idx === data.children.length - 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Lienzo Principal (Canvas) ---
const PyrhosMindMap = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 100 }); // Ajustado para mejor vista inicial
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="w-full h-screen bg-[#050505] overflow-hidden text-slate-300 font-mono flex flex-col">
      
      {/* UI Overlay (Header) */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/90 to-transparent z-50 pointer-events-none flex items-center justify-between px-8">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="bg-red-600 p-1.5 rounded text-white">
            <Ghost className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wider text-lg leading-none">PYRHOS<span className="text-red-500">.MAP</span></h1>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Knowledge Graph v3.0 - Detailed</span>
          </div>
        </div>
        
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/80 backdrop-blur p-1.5 rounded-lg border border-slate-800">
          <button onClick={() => setScale(s => Math.max(0.3, s - 0.1))} className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs w-12 text-center font-bold">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-700 mx-1"></div>
          <div className="p-2 text-slate-500 cursor-grab active:cursor-grabbing" title="Arrastra para mover">
            <Move className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Área del Mapa Interactivo */}
      <div 
        ref={containerRef}
        className={`flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing ${isDragging ? 'cursor-grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: `${30 * scale}px ${30 * scale}px`,
            backgroundPosition: `${position.x}px ${position.y}px`
          }}
        />
        
        <div 
          className="absolute origin-top-left transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
          }}
        >
          <div className="p-20">
             <MapNode data={initialData} />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-6 left-6 z-50 pointer-events-none">
        <div className="flex flex-col gap-1 text-[10px] text-slate-600 font-bold tracking-widest">
          <span>X: {Math.round(position.x)} / Y: {Math.round(position.y)}</span>
          <span>NODES: DETAILED // DEPTH: 4</span>
          <span className="text-red-900/50">SYSTEM: SECURE</span>
        </div>
      </div>

    </div>
  );
};

export default PyrhosMindMap;
