import React, { useState, useRef } from 'react';
import { 
  Shield, Terminal, Globe, Wifi, Eye, Activity, 
  Server, Database, Target, FileCode, 
  Ghost, ChevronRight, ZoomIn, ZoomOut, Move
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
              id: 'inf1', label: 'Enumeración (Nmap/NSE)', type: 'process',
              children: [
                { id: 'inf1-1', label: 'Host Discovery (-sn)' },
                { id: 'inf1-2', label: 'Port Scan (-p-)' },
                { id: 'inf1-3', label: 'Service Version (-sV)' },
                { id: 'inf1-4', label: 'NSE Scripts (-sC)' }
              ]
            },
            { 
              id: 'inf2', label: 'Explotación (Metasploit)', type: 'process',
              children: [
                { id: 'inf2-1', label: 'Searchsploit / CVEs' },
                { id: 'inf2-2', label: 'Password Spraying' },
                { id: 'inf2-3', label: 'Reverse Shells' }
              ]
            },
            { 
              id: 'inf3', label: 'Pivoting (Chisel/Ligolo)', type: 'process',
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
              id: 'web1', label: 'Recon (Fuzzing)', type: 'process',
              children: [
                { id: 'w1-1', label: 'Subdomain Enum' },
                { id: 'w1-2', label: 'Tech Profiling (Wappalyzer)' },
                { id: 'w1-3', label: 'Directory Fuzzing (Ffuf)' }
              ]
            },
            { 
              id: 'web2', label: 'OWASP Top 10', type: 'process',
              children: [
                { id: 'w2-1', label: 'SQL Injection (Union/Blind)' },
                { id: 'w2-2', label: 'XSS (Reflected/Stored)' },
                { id: 'w2-3', label: 'IDOR & Auth Bypass' },
                { id: 'w2-4', label: 'RCE / Command Inj' }
              ]
            },
            {
              id: 'web3', label: 'Herramientas', type: 'process',
              children: [
                { id: 'w3-1', label: 'Burp Suite Pro' },
                { id: 'w3-2', label: 'ZAP' },
                { id: 'w3-3', label: 'SQLMap' }
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
              id: 'ad1', label: 'Recon (Bloodhound)', type: 'process',
              children: [
                { id: 'ad1-1', label: 'Domain Mapping (Bloodhound)' },
                { id: 'ad1-2', label: 'User/Group Enum (LDAP)' },
                { id: 'ad1-3', label: 'Find Local Admins' }
              ]
            },
            { 
              id: 'ad2', label: 'Identity Attacks (Kerberoasting)', type: 'process',
              children: [
                { id: 'ad2-1', label: 'AS-REP Roasting' },
                { id: 'ad2-2', label: 'Kerberoasting' },
                { id: 'ad2-3', label: 'Pass-the-Hash/Ticket' }
              ]
            },
            { 
              id: 'ad3', label: 'Persistencia (Golden Ticket)', type: 'process',
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
        { id: 'o1', label: 'Google Dorks', type: 'topic', children: [{id: 'o1-1', label: 'Filetypes'}, {id: 'o1-2', label: 'Site Operator'}] },
        { id: 'o2', label: 'Infra (Shodan/Censys)', type: 'topic', children: [{id: 'o2-1', label: 'Shodan/Censys'}, {id: 'o2-2', label: 'Whois/DNS'}] },
        { id: 'o3', label: 'SOCMINT', type: 'topic', children: [{id: 'o3-1', label: 'Username Checks'}, {id: 'o3-2', label: 'Metadata Analysis'}] }
      ]
    },
    {
      id: 'blue',
      label: '06_Blue_Team',
      type: 'section',
      icon: 'Activity',
      children: [
        { id: 'b1', label: 'DFIR (Disco/Memoria)', type: 'topic', children: [{id:'b1-1', label: 'Triage & Collection'}, {id:'b1-2', label: 'Memory Analysis'}, {id:'b1-3', label: 'Disk Forensics'}] },
        { id: 'b2', label: 'SIEM & Logs (Splunk)', type: 'topic', children: [{id:'b2-1', label: 'Log Ingestion'}, {id:'b2-2', label: 'Correlation Rules'}] },
        { id: 'b3', label: 'Hunting (YARA Rules)', type: 'topic', children: [{id:'b3-1', label: 'IOC Matching'}, {id:'b3-2', label: 'YARA Rules'}] }
      ]
    }
  ]
};

// --- Mapeo de Iconos ---
const IconMap = {
  Ghost, Shield, Terminal, Globe, Wifi, Eye, Activity, 
  Server, Database, Target, FileCode, ChevronRight, ZoomIn, ZoomOut, Move
};

// --- Componente Nodo del Mapa ---
const MapNode = ({ data, depth = 0 }) => {
  // Ajuste: Colapsar nodos de proceso (depth 3) o superior por defecto, dejando la rama principal abierta.
  const [collapsed, setCollapsed] = useState(data.collapsed ?? (depth > 2)); 
  
  // Estilos para diferentes niveles de profundidad (Basado en la clase 'node-base')
  const getClassName = (type) => {
    switch(type) {
      case 'root': return 'node-root';
      case 'core': return 'node-core';
      case 'section': return 'node-section';
      case 'subsection': return 'node-subsection';
      case 'process': return 'node-process'; // Nivel de pasos intermedios
      case 'topic': return 'node-topic';
      default: return 'node-step'; // Hojas finales (Pasos)
    }
  };

  const NodeIcon = IconMap[data.icon];

  return (
    <div className="flex-row" style={{ display: 'flex', alignItems: 'center' }}>
      {/* El Nodo en sí */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', zIndex: 10 }}>
        <div 
          onClick={() => { if(data.children) setCollapsed(!collapsed); }}
          className={`node-base ${getClassName(data.type)} ${depth === 0 ? 'node-xl' : (depth >= 4 ? 'node-sm' : 'node-md')}`}
          style={{ 
            cursor: data.children ? 'pointer' : 'default', 
            transition: 'all 0.3s ease-in-out',
            paddingLeft: depth >= 4 ? '0.5rem' : '0.75rem',
            paddingRight: depth >= 4 ? '0.75rem' : '0.75rem',
          }}
        >
          {NodeIcon && <NodeIcon style={{ width: depth === 0 ? '24px' : '16px', height: depth === 0 ? '24px' : '16px' }} />}
          <span style={{ whiteSpace: 'nowrap' }}>{data.label}</span>
          
          {data.children && (
            <div 
              style={{ 
                marginLeft: '0.5rem', 
                padding: '2px', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(0,0,0,0.2)',
                transition: 'transform 0.3s',
                transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)'
              }}
            >
              <ChevronRight style={{ width: '12px', height: '12px' }} />
            </div>
          )}
        </div>
      </div>

      {/* Renderizado de Hijos (Rama derecha) */}
      {!collapsed && data.children && data.children.length > 0 && (
        <div className="flex-row" style={{ display: 'flex', alignItems: 'center' }}>
          
          {/* Línea Conectora Horizontal */}
          <div style={{ width: '2rem', height: '1px', backgroundColor: '#334155' }}></div>

          {/* Contenedor Vertical de Hijos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
            {/* Línea Conectora Vertical */}
            {data.children.length > 1 && (
               <div style={{ position: 'absolute', left: 0, top: '12px', bottom: '12px', width: '1px', backgroundColor: '#334155', transform: 'translateX(-1px)' }}></div>
            )}

            {data.children.map((child, idx) => (
              <div key={idx} className="flex-row" style={{ display: 'flex', alignItems: 'center', position: 'relative', padding: '0.25rem 0' }}>
                {/* Pequeña línea horizontal */}
                <div style={{ width: '1.5rem', height: '1px', backgroundColor: '#334155' }}></div>
                
                {/* Recursividad */}
                <MapNode data={child} depth={depth + 1} />
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
  const [position, setPosition] = useState({ x: 50, y: 100 }); 
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Evita la selección de texto durante el arrastre
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
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      backgroundColor: '#050505', 
      overflow: 'hidden', 
      color: '#e2e8f0', 
      fontFamily: 'monospace', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      {/* CSS Styles Block */}
      <style>
        {`
          .node-base {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            border-radius: 0.5rem;
            border: 1px solid transparent;
            transition: all 0.3s ease-in-out;
            user-select: none;
            cursor: pointer;
          }

          /* Hover effects */
          .node-base:hover {
            transform: scale(1.05);
          }
          .node-base:active {
            transform: scale(0.95);
          }

          /* Font Sizes and Weights */
          .node-xl { font-size: 1.25rem; font-weight: bold; padding: 1rem 1.5rem; }
          .node-md { font-size: 0.875rem; font-weight: 500; }
          .node-sm { font-size: 0.75rem; font-weight: 500; padding: 0.25rem 0.75rem; border-left: 1px solid #334155; }

          /* Node Colors */
          .node-root { 
            background-color: #dc2626; /* bg-red-600 */
            border-color: #ef4444; /* border-red-500 */
            color: white; 
            box-shadow: 0 0 30px rgba(220,38,38,0.4);
            border-width: 2px;
          }
          .node-core { 
            background-color: #0f172a; /* bg-slate-900 */
            border-color: #ef4444; /* border-red-500/80 */
            color: #fecaca; /* text-red-100 */
            box-shadow: 0 0 15px rgba(220,38,38,0.2);
          }
          .node-section { 
            background-color: #0f172a; /* bg-slate-900 */
            border-color: #475569; /* border-slate-600 */
            color: #e2e8f0; /* text-slate-200 */
          }
          .node-section:hover { border-color: #94a3b8; } /* hover:border-slate-400 */

          .node-subsection { 
            background-color: #020617; /* bg-slate-950 */
            border-color: #334155; /* border-slate-700 */
            color: #cbd5e1; /* text-slate-300 */
          }
          .node-subsection:hover { border-color: #64748b; } /* hover:border-slate-500 */

          .node-process { 
            background-color: #0f172a; 
            border-color: #1e293b; /* border-slate-800 */
            color: #cbd5e1;
            border-left: 2px solid #3b82f6; /* border-l-2 border-l-blue-500 */
          }
          
          .node-topic {
            background-color: #0f172a;
            border-color: #1e293b; 
            color: #cbd5e1;
          }

          .node-step {
            background-color: transparent;
            border-color: transparent;
            color: #94a3b8; /* text-slate-500 */
            font-size: 0.75rem;
            padding: 0.125rem 0.5rem;
          }
          .node-step:hover { color: #e2e8f0; }
          
          /* Utility styles for the UI header/footer */
          .ui-button {
            padding: 0.5rem;
            background-color: transparent;
            border: none;
            color: #94a3b8; /* text-slate-400 */
            border-radius: 0.5rem;
            transition: background-color 0.2s, color 0.2s;
          }
          .ui-button:hover {
            background-color: #1e293b; /* bg-slate-800 */
            color: white;
          }
          .ui-panel {
            background-color: rgba(15, 23, 42, 0.8); /* bg-slate-900/80 */
            backdrop-filter: blur(5px);
            padding: 0.375rem;
            border-radius: 0.5rem;
            border: 1px solid #1e293b; /* border-slate-800 */
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .ui-divider {
            width: 1px;
            height: 1rem;
            background-color: #334155; /* bg-slate-700 */
            margin: 0 0.25rem;
          }
        `}
      </style>

      {/* UI Overlay (Header) */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '4rem', 
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)', 
        zIndex: 50, 
        pointerEvents: 'none', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingLeft: '2rem', 
        paddingRight: '2rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', pointerEvents: 'auto' }}>
          <div style={{ backgroundColor: '#dc2626', padding: '0.375rem', borderRadius: '0.25rem', color: 'white' }}>
            <Ghost style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <h1 style={{ fontWeight: 'bold', color: 'white', letterSpacing: '0.05em', fontSize: '1.125rem', lineHeight: '1' }}>PYRHOS<span style={{ color: '#ef4444' }}>.MAP</span></h1>
            <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Knowledge Graph v3.0 - No Tailwind</span>
          </div>
        </div>
        
        <div className="ui-panel" style={{ pointerEvents: 'auto' }}>
          <button onClick={() => setScale(s => Math.max(0.3, s - 0.1))} className="ui-button" title="Zoom Out">
            <ZoomOut style={{ width: '16px', height: '16px' }} />
          </button>
          <span style={{ fontSize: '0.75rem', width: '3rem', textAlign: 'center', fontWeight: 'bold' }}>{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="ui-button" title="Zoom In">
            <ZoomIn style={{ width: '16px', height: '16px' }} />
          </button>
          <div className="ui-divider"></div>
          <div style={{ padding: '0.5rem', color: '#94a3b8', cursor: 'grab' }} title="Arrastra para mover">
            <Move style={{ width: '16px', height: '16px' }} />
          </div>
        </div>
      </div>

      {/* Área del Mapa Interactivo */}
      <div 
        ref={containerRef}
        style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          style={{
            position: 'absolute', 
            inset: 0, 
            pointerEvents: 'none', 
            opacity: 0.1,
            backgroundImage: `
              linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: `${30 * scale}px ${30 * scale}px`,
            backgroundPosition: `${position.x}px ${position.y}px`
          }}
        />
        
        <div 
          style={{
            position: 'absolute', 
            transformOrigin: 'top left', 
            transition: 'transform 0.075s ease-out',
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
          }}
        >
          <div style={{ padding: '5rem' }}>
             <MapNode data={initialData} />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 50, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '10px', color: '#475569', fontWeight: 'bold', letterSpacing: '0.1em' }}>
          <span>X: {Math.round(position.x)} / Y: {Math.round(position.y)}</span>
          <span>NODOS: DETAILED // DEPTH: 4</span>
          <span style={{ color: 'rgba(185, 28, 28, 0.5)' }}>SYSTEM: SECURE</span>
        </div>
      </div>

    </div>
  );
};

export default PyrhosMindMap;
