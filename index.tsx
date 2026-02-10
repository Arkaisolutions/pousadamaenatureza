/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import './index.css';
import React, { useState, useMemo, useEffect, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';

// ============================================================================
// 1. ÍCONES (SVG Components)
// ============================================================================
const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);
const DollarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m-4-8c0-1.105.902-2 2-2h1c2.21 0 4 1.79 4 4s-1.79 4-4 4H9c-1.105 0-2-.895-2-2z" />
  </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const CalendarIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const BanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
);
const BedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
);
const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
);
const ArrowDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);
const ListBulletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);
const Squares2x2Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);
const BroomIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 11v10h14V11M2 11h20M12 21a2 2 0 100-4 2 2 0 000 4z" transform="rotate(45 12 12) translate(-2 -4)"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1" transform="rotate(45 12 12) translate(-2 -4)"/>
    </svg>
);
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const ExclamationTriangleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);
const WrenchScrewdriverIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632zM12 10.5h.008v.008H12v-.008z" />
    </svg>
);
const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L13.196 5.232z" />
    </svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);
const Cog6ToothIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257-1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.57 6.57 0 01-.22.127c-.332.183-.582.495-.645.87l-.213 1.281c-.09.542-.56.94-1.11-.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313.686-.645-.87-.074-.04-.147-.083-.22-.127-.324.196-.72.257-1.075.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.003-.827c.293-.24.438.613-.438.995s-.145-.755-.438-.995l-1.003-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37.49l1.217.456c.355.133.75.072 1.075.124.074-.04.147-.083.22-.127.332-.183-.582-.495-.645-.87l.213-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const ArrowLeftOnRectangleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l-3-3m0 0l-3 3m3-3V9" />
    </svg>
);
const BanknotesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414-.336.75-.75.75h-.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5m3-3l-3-3m0 0l-3 3m3-3v6m-9 3h2.25a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H5.25a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75m3-3h2.25a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H8.25a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75m3-3h2.25a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-2.25a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75M15 12h-3v-3h3v3z" />
    </svg>
);
const ArrowTrendingDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.511l-5.511-3.182" />
    </svg>
);
const ChartPieIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>
);
const ScaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.036.243c-2.132 0-4.14-.818-5.62-2.24l-2.62-2.62a1.125 1.125 0 00-1.59 0l-2.62 2.62c-1.48 1.422-3.488 2.24-5.62 2.24a5.988 5.988 0 01-2.036-.243c-.483-.174-.711-.703-.59-1.202L5.25 4.971m13.5 0A48.49 48.49 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52L12 18.25l-2.62-2.62" />
    </svg>
);
const Bars3Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);


// ============================================================================
// 2. TIPOS E CONSTANTES (Types & Constants)
// ============================================================================
type ReservationStatus = 'Confirmada' | 'Cancelada' | 'Pendente';
type Reservation = {
    id: number;
    guestName: string;
    contact: string;
    accommodation: string;
    bookingChannel: string;
    description: string;
    adults: number;
    children: number;
    extraBed: boolean;
    breakfast: boolean;
    checkIn: string; // YYYY-MM-DD
    checkOut: string; // YYYY-MM-DD
    numberOfNights: number;
    totalRevenue: number;
    amountPaid: number;
    amountPending: number;
    downPayment: boolean;
    observations: string;
    status: ReservationStatus;
};

type NewReservationData = Omit<Reservation, 'id' | 'amountPending' | 'downPayment' | 'numberOfNights'>;

type SuiteStatusOptions = 'clean' | 'dirty' | 'occupied' | 'maintenance';
type SuiteStatus = {
    id: number;
    name: string;
    status: SuiteStatusOptions;
    guestName?: string;
    checkOutDate?: string;
    maintenanceReason?: string;
};

type ContactStatus = 'Novo' | 'Contatado' | 'Qualificado' | 'Agendado' | 'Convertido' | 'Não Qualificado' | 'Hóspede';
const CONTACT_STATUSES: ContactStatus[] = ['Novo', 'Contatado', 'Qualificado', 'Agendado', 'Convertido', 'Não Qualificado', 'Hóspede'];

type Contact = {
  id: number;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  status: ContactStatus;
  location?: string;
  notes?: string;
  createdAt: string;
  lastUpdate: string;
};

type CostCategory = 'Comissões' | 'Manutenção' | 'Salários' | 'Marketing' | 'Utilities' | 'Suprimentos' | 'Outros';
type CostType = 'Fixo' | 'Variável';
const COST_CATEGORIES: CostCategory[] = ['Comissões', 'Manutenção', 'Salários', 'Marketing', 'Utilities', 'Suprimentos', 'Outros'];
const COST_TYPES: CostType[] = ['Fixo', 'Variável'];

type Cost = {
    id: number;
    description: string;
    category: CostCategory;
    type: CostType;
    amount: number;
    date: string; // YYYY-MM-DD
};

type View = 'dashboard' | 'reservations' | 'financial' | 'contacts' | 'governance' | 'settings';

// ============================================================================
// 3. FUNÇÕES UTILITÁRIAS (Utility Functions)
// ============================================================================
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (e) {
        return '';
    }
};

const TOTAL_SUITES = 20; // Aumentado para refletir um hotel
const parseSuitesFromReservation = (res: Reservation): number => {
    const accommodation = res.accommodation.toLowerCase();
    const description = res.description.toLowerCase();
    if (accommodation.includes('hotel completo') || accommodation.includes('pousada total')) return TOTAL_SUITES;
    const match = description.match(/(\d+)\s*su[íi]tes?/);
    if (match && match[1]) {
        const count = parseInt(match[1], 10);
        return isNaN(count) ? 0 : count;
    }
    if (accommodation.includes('suíte') || description.includes('suíte') || accommodation.includes('quarto')) return 1;
    return 0;
};

// ============================================================================
// 4. DADOS INICIAIS (Initial Data)
// ============================================================================
// RESET DE DADOS PARA NOVO HOTEL: Hotel Palace Serra Verde Imperial
const initialReservationsData: Omit<Reservation, 'amountPending' | 'downPayment'>[] = [
  // Dados de exemplo apenas para demonstração do sistema limpo
  { id: 1, guestName: "Exemplo Hóspede VIP", contact: "21 99999-9999", accommodation: "Suíte Imperial", bookingChannel: "Reserva Direta", description: "1 Suíte Master", adults: 2, children: 0, extraBed: false, breakfast: true, checkIn: new Date().toISOString().split('T')[0], checkOut: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], numberOfNights: 2, totalRevenue: 1500, amountPaid: 1500, observations: "Teste de sistema limpo", status: 'Confirmada' },
];
const initialReservations = initialReservationsData.map(r => ({ ...r, amountPending: r.totalRevenue - r.amountPaid, downPayment: r.amountPaid > 0 }));

const initialContactsData: Contact[] = [
    { id: 1, name: "Exemplo Agência", company: 'Viagens Imperial', email: 'contato@imperial.com', phone: '11987654321', status: 'Novo', location: 'São Paulo, SP', notes: 'Interesse em parceria corporativa', createdAt: new Date().toISOString(), lastUpdate: new Date().toISOString() },
];

const initialCosts: Cost[] = [
    { id: 1, description: 'Manutenção Inicial - Jardim', category: 'Manutenção', type: 'Variável', amount: 250.00, date: new Date().toISOString().split('T')[0] },
];

const initialSuiteStatuses: SuiteStatus[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Apto ${i + 1}`,
    status: 'clean',
}));

// ============================================================================
// 5. CONTEXT API (State Management)
// ============================================================================

interface AppContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    currentView: View;
    setCurrentView: React.Dispatch<React.SetStateAction<View>>;
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    reservations: Reservation[];
    suiteStatuses: SuiteStatus[];
    costs: Cost[];
    contacts: Contact[];
    loggedInUser: string | null;
    apiBaseUrl: string;
    setApiBaseUrl: React.Dispatch<React.SetStateAction<string>>;
    apiKey: string;
    setApiKey: React.Dispatch<React.SetStateAction<string>>;
    handleAddReservation: (res: NewReservationData) => void;
    handleDeleteReservation: (id: number) => void;
    handleUpdateSuiteStatus: (suiteId: number, newStatusData: Partial<SuiteStatus>) => void;
    handleUpdateContact: (updatedContact: Contact) => void;
    handleAddContact: (newContact: Contact) => void;
    handleDeleteContact: (contactId: number) => void;
    handleAddCost: (newCostData: Omit<Cost, 'id'>) => void;
    handleUpdateCost: (updatedCost: Cost) => void;
    handleDeleteCost: (costId: number) => void;
    handleLogin: (login: string, pass: string) => boolean;
    handleLogout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within the AppProvider");
    }
    return context;
};

// ============================================================================
// 6. COMPONENTES DE UI (Generic UI Components)
// ============================================================================
interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  colorClass?: string;
  description?: string;
  comparison?: {
    value: number;
    period: string;
  };
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, colorClass = 'bg-hotel-blue', description, comparison }) => {
  const hasComparison = comparison && isFinite(comparison.value);
  const isPositive = hasComparison && comparison.value > 0;
  const isNegative = hasComparison && comparison.value < 0;

  return (
    <div className={`p-4 md:p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl ${colorClass} text-white flex flex-col justify-between min-h-[160px]`}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{title}</h3>
        {icon && <div className="text-2xl opacity-80">{icon}</div>}
      </div>
      <div>
         <p className="text-2xl md:text-3xl font-bold mt-2">{value}</p>
         {hasComparison && (
          <div className={`mt-2 inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-white/30' : 'bg-black/20'}`}>
            {isPositive && <ArrowUpIcon />}
            {isNegative && <ArrowDownIcon />}
            <span className="ml-1">{Math.abs(comparison.value).toFixed(1)}% vs {comparison.period}</span>
          </div>
        )}
      </div>
      <p className="text-xs opacity-90 mt-1 flex-shrink-0">{description}</p>
    </div>
  );
};

const PageHeader: React.FC<{ title: string, children?: React.ReactNode }> = ({ title, children }) => (
    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-hotel-blue-dark dark:text-hotel-blue-light">{title}</h2>
        <div className="flex items-center gap-4">{children}</div>
    </div>
);

const Section: React.FC<{title: string, children: React.ReactNode, className?: string}> = ({title, children, className}) => (
    <section className={`bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl shadow-md ${className}`}>
        <h3 className="text-xl font-bold text-hotel-blue-dark dark:text-hotel-blue-light mb-4">{title}</h3>
        {children}
    </section>
);

const SimpleBarChart: React.FC<{ data: { label: string; value: number }[]; currency?: boolean; }> = ({ data, currency = false }) => {
    const maxValue = useMemo(() => Math.max(...data.map(d => d.value)), [data]);
    if (data.length === 0) return <div className="text-center text-gray-500 py-4">Sem dados para exibir.</div>;
    return (
        <div className="space-y-3">
            {data.sort((a,b) => b.value - a.value).map(item => (
                <div key={item.label} className="grid grid-cols-1 sm:grid-cols-4 gap-x-2 items-center text-sm">
                    <span className="font-medium truncate col-span-1 text-gray-700 dark:text-gray-300 text-left">{item.label}</span>
                    <div className="col-span-3 flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5">
                            <div className="bg-hotel-blue h-5 rounded-full" style={{ width: maxValue > 0 ? `${(item.value / maxValue) * 100}%` : '0%' }}/>
                        </div>
                        <span className="font-semibold w-24 text-right">{currency ? formatCurrency(item.value) : item.value.toLocaleString('pt-BR')}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

const VerticalBarChart: React.FC<{ data: { label: string; value: number }[] }> = ({ data }) => {
    const maxValue = useMemo(() => Math.max(...data.map(d => d.value), 0), [data]);
    if (data.length === 0 || maxValue === 0) return <div className="text-center text-gray-500 py-16 h-80 flex items-center justify-center">Sem dados de receita para exibir.</div>;
    return (
        <div className="h-80 w-full bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg flex justify-around items-end gap-2 md:gap-4">
            {data.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center justify-end gap-2 group h-full">
                    <div className="relative w-full h-full flex items-end">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">{formatCurrency(item.value)}</div>
                        <div className="w-full bg-hotel-blue hover:bg-hotel-blue-dark transition-all duration-300 rounded-t-md" style={{ height: maxValue > 0 ? `${(item.value / maxValue) * 100}%` : '0%' }}></div>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

// ============================================================================
// 7. PÁGINAS E COMPONENTES DE FEATURE (Pages & Feature Components)
// ============================================================================

// -------------------- Dashboard --------------------
const getDashboardMetrics = (reservationsForPeriod: Reservation[], periodLabel: number | 'all', allReservations: Reservation[]) => {
    const confirmed = reservationsForPeriod.filter(r => r.status === 'Confirmada');
    const cancelled = reservationsForPeriod.filter(r => r.status === 'Cancelada');
    const totalRevenue = confirmed.reduce((acc, res) => acc + res.totalRevenue, 0);
    const totalPaid = confirmed.reduce((acc, res) => acc + res.amountPaid, 0);
    const totalPending = totalRevenue - totalPaid;
    const totalGuests = confirmed.reduce((acc, res) => acc + res.adults + res.children, 0);
    const ticketMedio = confirmed.length > 0 ? totalRevenue / confirmed.length : 0;
    const cancellationRate = reservationsForPeriod.length > 0 ? (cancelled.length / reservationsForPeriod.length) * 100 : 0;
    const revenueByChannel = Object.entries(confirmed.reduce((acc, r) => {
        const channel = r.bookingChannel || 'Não especificado';
        acc[channel] = (acc[channel] || 0) + r.totalRevenue;
        return acc;
    }, {} as Record<string, number>)).map(([label, value]) => ({label, value}));
    
    const getDaysInPeriod = () => {
        if (periodLabel === 'all') {
            if (allReservations.length === 0) return 1;
            const dates = allReservations.map(r => new Date(r.checkIn).getTime());
            const minDate = new Date(Math.min(...dates));
            const maxDate = new Date(Math.max(...dates));
            const diff = (maxDate.getTime() - minDate.getTime()) / (1000 * 3600 * 24);
            return Math.max(1, Math.round(diff) + 1);
        }
        const year = periodLabel as number;
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        return isLeap ? 366 : 365;
    };
    const daysInPeriod = getDaysInPeriod();
    const occupiedRoomNights = confirmed.reduce((acc, res) => acc + (parseSuitesFromReservation(res) * res.numberOfNights), 0);
    const totalAvailableRoomNights = TOTAL_SUITES * daysInPeriod;
    const occupancyRate = totalAvailableRoomNights > 0 ? (occupiedRoomNights / totalAvailableRoomNights) * 100 : 0;
    const adr = occupiedRoomNights > 0 ? totalRevenue / occupiedRoomNights : 0;
    const revPar = totalAvailableRoomNights > 0 ? totalRevenue / totalAvailableRoomNights : 0;
    const avgStayLength = confirmed.length > 0 ? confirmed.reduce((acc, res) => acc + res.numberOfNights, 0) / confirmed.length : 0;
    return { confirmed, cancelled, totalRevenue, totalPaid, totalPending, ticketMedio, totalGuests, cancellationRate, revenueByChannel, occupancyRate, adr, revPar, avgStayLength };
};

const UpcomingEvents: React.FC = () => {
    const { reservations } = useAppContext();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const events = useMemo(() => {
        return reservations
            .filter(r => r.status === 'Confirmada' && (new Date(r.checkIn) >= today || new Date(r.checkOut) >= today))
            .flatMap(r => ([ { type: 'Check-in', date: new Date(r.checkIn), reservation: r}, { type: 'Check-out', date: new Date(r.checkOut), reservation: r} ]))
            .filter(event => event.date >= today)
            .sort((a,b) => a.date.getTime() - b.date.getTime())
            .slice(10, 20); // Just a variety
    }, [reservations]);

    if (events.length === 0) return <div className="text-center text-gray-500 py-4">Nenhum evento futuro próximo.</div>;
    return (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {events.map((event, index) => (
                <div key={`${event.reservation.id}-${event.type}-${index}`} className="flex items-center gap-4 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className={`text-center w-16 px-2 py-1 rounded-md text-white font-bold ${event.type === 'Check-in' ? 'bg-green-500' : 'bg-red-500'}`}>
                        <div className="text-xs">{event.date.toLocaleDateString('pt-BR', {month: 'short', timeZone: 'UTC'})}</div>
                        <div className="text-lg">{event.date.getUTCDate()}</div>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{event.reservation.guestName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{event.type}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const DashboardPage: React.FC = () => {
    const { reservations: allReservations } = useAppContext();
    const [selectedYear, setSelectedYear] = useState<'all' | number>(new Date().getFullYear());

    const { years, confirmed, totalGuests, cancellationRate, repeatGuestCount, occupancyRate, adr, revPar, avgStayLength, totalRevenue, totalPaid, totalPending, ticketMedio, totalCommission, comparisonData } = useMemo(() => {
        const yearSet = new Set(allReservations.map(r => new Date(r.checkIn).getFullYear()));
        const years = ['all', ...Array.from(yearSet).sort((a,b) => b-a)];
        const reservations = selectedYear === 'all' ? allReservations : allReservations.filter(r => new Date(r.checkIn).getFullYear() === selectedYear);
        const currentMetrics = getDashboardMetrics(reservations, selectedYear, allReservations);
        const guestStayCounts = allReservations.filter(r => r.status === 'Confirmada').reduce((acc, r) => {
            const key = r.contact || r.guestName;
            if (!key) return acc;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        const repeatGuestCount = Object.values(guestStayCounts).filter(count => count > 1).length;
        
        // Cálculo da Comissão de 20%
        const totalCommission = currentMetrics.totalRevenue * 0.20;

        let comparisonData: any = {};
        if (typeof selectedYear === 'number') {
            const prevYear = selectedYear - 1;
            const prevReservations = allReservations.filter(r => new Date(r.checkIn).getFullYear() === prevYear);
            if (prevReservations.length > 0) {
                const prevMetrics = getDashboardMetrics(prevReservations, prevYear, allReservations);
                const calculateChange = (current: number, previous: number) => {
                    if (!isFinite(current) || !isFinite(previous) || previous === 0) return 0;
                    return ((current - previous) / previous) * 100;
                };
                const periodLabel = `'${String(prevYear).slice(-2)}`;
                comparisonData = {
                    occupancyRate: { value: calculateChange(currentMetrics.occupancyRate, prevMetrics.occupancyRate), period: periodLabel },
                    adr: { value: calculateChange(currentMetrics.adr, prevMetrics.adr), period: periodLabel },
                    revPar: { value: calculateChange(currentMetrics.revPar, prevMetrics.revPar), period: periodLabel },
                    avgStayLength: { value: calculateChange(currentMetrics.avgStayLength, prevMetrics.avgStayLength), period: periodLabel },
                    totalRevenue: { value: calculateChange(currentMetrics.totalRevenue, prevMetrics.totalRevenue), period: periodLabel },
                    totalPaid: { value: calculateChange(currentMetrics.totalPaid, prevMetrics.totalPaid), period: periodLabel },
                    totalPending: { value: calculateChange(currentMetrics.totalPending, prevMetrics.totalPending), period: periodLabel },
                    ticketMedio: { value: calculateChange(currentMetrics.ticketMedio, prevMetrics.ticketMedio), period: periodLabel },
                };
            }
        }
        return { ...currentMetrics, years, repeatGuestCount, totalCommission, comparisonData };
    }, [allReservations, selectedYear]);
    
    return (
        <div className="p-4 md:p-8 space-y-8">
            <PageHeader title="Visão Geral">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    {years.map(year => (
                        <button key={year} onClick={() => setSelectedYear(year as any)} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${selectedYear === year ? 'bg-hotel-blue text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{year === 'all' ? 'Total' : year}</button>
                    ))}
                </div>
            </PageHeader>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Section title="Resumo Financeiro">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <KpiCard title="Receita Total" value={formatCurrency(totalRevenue)} icon={<DollarIcon />} colorClass="bg-blue-600" comparison={comparisonData.totalRevenue} />
                            <KpiCard title="Total Comissões (20%)" value={formatCurrency(totalCommission)} icon={<BanknotesIcon />} colorClass="bg-purple-700" description="Controle Agência" />
                            <KpiCard title="Receita Realizada" value={formatCurrency(totalPaid)} icon={<DollarIcon />} colorClass="bg-green-600" comparison={comparisonData.totalPaid} />
                            <KpiCard title="Saldo Pendente" value={formatCurrency(totalPending)} icon={<DollarIcon />} colorClass="bg-amber-500" comparison={comparisonData.totalPending} />
                        </div>
                    </Section>
                    <Section title="Métricas Chave de Desempenho (KPIs)">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <KpiCard title="Taxa de Ocupação" value={`${occupancyRate.toFixed(1)}%`} icon={<BedIcon />} colorClass="bg-cyan-600" description="Aptos ocupados" comparison={comparisonData.occupancyRate} />
                            <KpiCard title="Diária Média (ADR)" value={formatCurrency(adr)} icon={<DollarIcon />} colorClass="bg-indigo-600" description="Receita por quarto" comparison={comparisonData.adr} />
                            <KpiCard title="RevPAR" value={formatCurrency(revPar)} icon={<DollarIcon />} colorClass="bg-violet-600" description="Receita/Disponível" comparison={comparisonData.revPar} />
                            <KpiCard title="Estadia Média" value={`${avgStayLength.toFixed(1)} noites`} icon={<CalendarIcon />} colorClass="bg-purple-600" description="Duração média" comparison={comparisonData.avgStayLength} />
                        </div>
                    </Section>
                     <Section title="Resumo Operacional e Marketing">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           <KpiCard title="Reservas Confirmadas" value={confirmed.length} icon={<CalendarIcon />} colorClass="bg-hotel-blue" />
                           <KpiCard title="Total de Hóspedes" value={totalGuests} icon={<UsersIcon />} colorClass="bg-pink-600" />
                           <KpiCard title="Taxa de Cancelamento" value={`${cancellationRate.toFixed(1)}%`} icon={<BanIcon />} colorClass="bg-red-600" />
                           <KpiCard title="Hóspedes Recorrentes" value={repeatGuestCount} description="Fidelidade" icon={<UsersIcon />} colorClass="bg-fuchsia-600" />
                        </div>
                    </Section>
                </div>
                <div className="lg:col-span-1"><Section title="Próximos Eventos"><UpcomingEvents /></Section></div>
            </div>
        </div>
    );
};

// -------------------- Reservas --------------------
const ReservationsTable: React.FC = () => {
  const { reservations, handleDeleteReservation } = useAppContext();
  const getStatusBadge = (res: Reservation) => {
    if (res.status === 'Cancelada') return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Cancelada</span>;
    if (res.amountPending <= 0) return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Pago</span>;
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" title={`Total: ${formatCurrency(res.totalRevenue)}, Pago: ${formatCurrency(res.amountPaid)}`}>Pendente: {formatCurrency(res.amountPending)}</span>;
  };
  const sortedReservations = useMemo(() => [...reservations].sort((a,b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime()), [reservations]);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-hotel-text dark:text-gray-300">
          <thead className="text-xs text-hotel-blue-dark dark:text-hotel-blue-light uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Hóspede Responsável</th>
              <th scope="col" className="px-6 py-3">Período</th>
              <th scope="col" className="px-6 py-3">Pessoas</th>
              <th scope="col" className="px-6 py-3">Canal</th>
              <th scope="col" className="px-6 py-3">Valor Total</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedReservations.map((res) => (
              <tr key={res.id} className={`border-b dark:border-gray-700 transition-colors ${res.status === 'Cancelada' ? 'bg-gray-100 dark:bg-gray-800/50 opacity-60' : 'hover:bg-gray-50 dark:hover:bg-gray-600'}`}>
                <td className="px-6 py-4 font-medium whitespace-nowrap"><div>{res.guestName}</div><div className="text-gray-500 dark:text-gray-400 text-xs">{res.contact}</div></td>
                <td className="px-6 py-4">{formatDate(res.checkIn)} a {formatDate(res.checkOut)}<div className="text-gray-500 dark:text-gray-400 text-xs">{res.numberOfNights} noite(s)</div></td>
                <td className="px-6 py-4">{res.adults + res.children} ({res.adults}A, {res.children}C)</td>
                <td className="px-6 py-4">{res.bookingChannel}</td>
                <td className="px-6 py-4 font-semibold">{formatCurrency(res.totalRevenue)}</td>
                <td className="px-6 py-4">{getStatusBadge(res)}</td>
                <td className="px-6 py-4">
                    <button 
                        onClick={() => { if(confirm('Tem certeza que deseja excluir esta reserva permanentemente?')) handleDeleteReservation(res.id); }} 
                        className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                        title="Excluir Reserva"
                    >
                        <TrashIcon />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MonthlyCalendarView: React.FC = () => {
    const { reservations } = useAppContext();
    const [viewDate, setViewDate] = useState(new Date());

    const { month, year, days, monthName } = useMemo(() => {
        const currentMonth = viewDate.getMonth(), currentYear = viewDate.getFullYear();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const monthDays = Array.from({ length: daysInMonth }, (_, i) => ({ date: new Date(Date.UTC(currentYear, currentMonth, i + 1)), isCurrentMonth: true, isToday: new Date(Date.UTC(currentYear, currentMonth, i + 1)).toDateString() === new Date().toDateString() }));
        const prevMonthPaddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({ date: new Date(Date.UTC(currentYear, currentMonth, i - firstDayOfMonth + 1)), isCurrentMonth: false, isToday: false }));
        const totalDays = prevMonthPaddingDays.length + monthDays.length;
        const nextMonthPaddingDays = Array.from({ length: (7 - (totalDays % 7)) % 7 }, (_, i) => ({ date: new Date(Date.UTC(currentYear, currentMonth, daysInMonth + i + 1)), isCurrentMonth: false, isToday: false }));
        return { month: currentMonth, year: currentYear, days: [...prevMonthPaddingDays, ...monthDays, ...nextMonthPaddingDays], monthName: viewDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric', timeZone: 'UTC' }) };
    }, [viewDate]);

    const eventsByDate = useMemo(() => {
        const eventMap = new Map<string, { checkIns: Reservation[], checkOuts: Reservation[] }>();
        reservations.forEach(res => {
            if (res.status === 'Confirmada') {
                const checkInDate = new Date(res.checkIn);
                const checkInDateKey = new Date(Date.UTC(checkInDate.getUTCFullYear(), checkInDate.getUTCMonth(), checkInDate.getUTCDate())).toDateString();
                if (!eventMap.has(checkInDateKey)) eventMap.set(checkInDateKey, { checkIns: [], checkOuts: [] });
                eventMap.get(checkInDateKey)!.checkIns.push(res);

                const checkOutDate = new Date(res.checkOut);
                const checkOutDateKey = new Date(Date.UTC(checkOutDate.getUTCFullYear(), checkOutDate.getUTCMonth(), checkOutDate.getUTCDate())).toDateString();
                if (!eventMap.has(checkOutDateKey)) eventMap.set(checkOutDateKey, { checkIns: [], checkOuts: [] });
                eventMap.get(checkOutDateKey)!.checkOuts.push(res);
            }
        });
        return eventMap;
    }, [reservations]);
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-4">
            <header className="flex justify-between items-center mb-4">
                <button onClick={() => setViewDate(new Date(year, month - 1))} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Mês anterior">&lt;</button>
                <h3 className="text-lg font-bold text-hotel-blue-dark dark:text-hotel-blue-light capitalize">{monthName}</h3>
                <button onClick={() => setViewDate(new Date(year, month + 1))} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Próximo mês">&gt;</button>
            </header>
            <div className="grid grid-cols-7 gap-1">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => <div key={day} className="text-center font-semibold text-xs text-gray-500 dark:text-gray-400 p-2">{day}</div>)}
                {days.map(({ date, isCurrentMonth, isToday }, index) => {
                    const events = eventsByDate.get(date.toDateString());
                    return (
                        <div key={index} className={`relative p-2 min-h-[8rem] border border-gray-200 dark:border-gray-700 rounded-md transition-colors ${isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                            <span className={`absolute top-2 right-2 text-xs font-bold ${isToday ? 'bg-hotel-blue text-white rounded-full h-6 w-6 flex items-center justify-center' : ''} ${!isCurrentMonth ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>{date.getUTCDate()}</span>
                            <div className="mt-8 space-y-1 overflow-y-auto max-h-[calc(8rem-2rem)]">
                                {events?.checkIns.map(res => <div key={`ci-${res.id}`} className="px-1.5 py-0.5 text-xs rounded-md bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 truncate" title={`Check-in: ${res.guestName}`}><span className="font-bold text-green-900 dark:text-green-100">IN:</span> {res.guestName}</div>)}
                                {events?.checkOuts.map(res => <div key={`co-${res.id}`} className="px-1.5 py-0.5 text-xs rounded-md bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 truncate" title={`Check-out: ${res.guestName}`}><span className="font-bold text-red-900 dark:text-red-100">OUT:</span> {res.guestName}</div>)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const AddReservationModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const { handleAddReservation } = useAppContext();
    const [isSaving, setIsSaving] = useState(false);
    // Estado inicial com tipos flexíveis para permitir edição fluida de números
    const [newRes, setNewRes] = useState<any>({
        guestName: '', contact: '', accommodation: 'HOTEL COMPLETO', bookingChannel: 'Reserva WhatsApp', description: '', adults: 2, children: 0,
        extraBed: false, breakfast: false, checkIn: '', checkOut: '', totalRevenue: 0, amountPaid: 0, observations: '', status: 'Confirmada',
    });

    useEffect(() => {
        if(isOpen) {
            setIsSaving(false);
            setNewRes({
                guestName: '', contact: '', accommodation: 'HOTEL COMPLETO', bookingChannel: 'Reserva WhatsApp', description: '', adults: 2, children: 0,
                extraBed: false, breakfast: false, checkIn: '', checkOut: '', totalRevenue: 0, amountPaid: 0, observations: '', status: 'Confirmada',
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let finalValue: any = value;
        
        if (type === 'checkbox') {
            finalValue = (e.target as HTMLInputElement).checked;
        }
        // Mantemos como string durante a digitação para permitir "0", "" (vazio) e decimais parciais (ex: "10.")
        
        setNewRes((prev: any) => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSaving) return;
        setIsSaving(true);
        
        // Converte para número apenas na hora de salvar
        const submissionData: NewReservationData = {
            ...newRes,
            adults: newRes.adults === '' ? 0 : Number(newRes.adults),
            children: newRes.children === '' ? 0 : Number(newRes.children),
            totalRevenue: newRes.totalRevenue === '' ? 0 : Number(newRes.totalRevenue),
            amountPaid: newRes.amountPaid === '' ? 0 : Number(newRes.amountPaid),
        };

        // Simulate API call for better UX
        setTimeout(() => {
            handleAddReservation(submissionData);
            onClose();
        }, 500);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b dark:border-gray-700"><h3 className="text-xl font-bold text-hotel-blue-dark dark:text-hotel-blue-light">Adicionar Nova Reserva</h3><button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><CloseIcon /></button></header>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label htmlFor="guestName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome do Hóspede</label><input type="text" name="guestName" id="guestName" required value={newRes.guestName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contato</label><input type="text" name="contact" id="contact" value={newRes.contact} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Check-in</label><input type="date" name="checkIn" id="checkIn" required value={newRes.checkIn} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Check-out</label><input type="date" name="checkOut" id="checkOut" required value={newRes.checkOut} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="adults" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adultos</label><input type="number" name="adults" id="adults" min="0" required value={newRes.adults} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="children" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Crianças</label><input type="number" name="children" id="children" min="0" required value={newRes.children} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div>
                            <label htmlFor="totalRevenue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor Total (R$)</label>
                            <input type="number" name="totalRevenue" id="totalRevenue" min="0" step="0.01" required value={newRes.totalRevenue} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                            {Number(newRes.totalRevenue) > 0 && <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-semibold">Comissão Agência (20%): {formatCurrency(Number(newRes.totalRevenue) * 0.2)}</div>}
                        </div>
                        <div><label htmlFor="amountPaid" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor Pago (R$)</label><input type="number" name="amountPaid" id="amountPaid" min="0" step="0.01" required value={newRes.amountPaid} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="bookingChannel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Canal da Reserva</label><input type="text" name="bookingChannel" id="bookingChannel" value={newRes.bookingChannel} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label><select name="status" id="status" value={newRes.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"><option>Confirmada</option><option>Cancelada</option><option>Pendente</option></select></div>
                    </div>
                     <footer className="flex items-center justify-end gap-4 pt-4 border-t dark:border-gray-700"><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors">Cancelar</button><button type="submit" disabled={isSaving} className="px-4 py-2 bg-hotel-blue text-white font-semibold rounded-lg shadow-md hover:bg-hotel-blue-dark transition-colors disabled:bg-hotel-blue/70 disabled:cursor-not-allowed">{isSaving ? 'Salvando...' : 'Salvar Reserva'}</button></footer>
                </form>
            </div>
        </div>
    );
};

const ReservationsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    return (
        <div className="p-4 md:p-8 space-y-8">
            <PageHeader title="Controle de Reservas">
                 <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-hotel-blue text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`} title="Ver como Lista"><ListBulletIcon /></button>
                    <button onClick={() => setViewMode('calendar')} className={`p-2 rounded-md transition-colors ${viewMode === 'calendar' ? 'bg-hotel-blue text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`} title="Ver como Calendário"><Squares2x2Icon /></button>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-hotel-blue text-white font-semibold rounded-lg shadow-md hover:bg-hotel-blue-dark transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>Adicionar Reserva</button>
            </PageHeader>
            {viewMode === 'list' ? <ReservationsTable /> : <MonthlyCalendarView />}
            <AddReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

// -------------------- Contatos --------------------
const EditContactModal: React.FC<{isOpen: boolean; onClose: () => void; onSave: (contact: Contact) => void; contact: Contact | null; }> = ({ isOpen, onClose, onSave, contact }) => {
    const [formData, setFormData] = useState<Partial<Contact>>(contact || { status: 'Novo', name: '', createdAt: new Date().toISOString() });
    useEffect(() => { setFormData(contact || { status: 'Novo', name: '', createdAt: new Date().toISOString() }); }, [contact, isOpen]);
    if (!isOpen) return null;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: contact?.id || Date.now(), lastUpdate: new Date().toISOString() } as Contact);
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b dark:border-gray-700"><h3 className="text-xl font-bold text-hotel-blue-dark dark:text-hotel-blue-light">{contact ? 'Editar Contato' : 'Adicionar Novo Contato'}</h3><button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><CloseIcon /></button></header>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label><input type="text" name="name" id="name" required value={formData.name || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Empresa</label><input type="text" name="company" id="company" value={formData.company || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label><input type="email" name="email" id="email" value={formData.email || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label><input type="tel" name="phone" id="phone" value={formData.phone || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Localização</label><input type="text" name="location" id="location" value={formData.location || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label><select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{CONTACT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                        <div className="md:col-span-2"><label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notas</label><textarea name="notes" id="notes" rows={3} value={formData.notes || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                    </div>
                    <footer className="flex items-center justify-end gap-4 pt-4 border-t dark:border-gray-700"><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors">Cancelar</button><button type="submit" className="px-4 py-2 bg-hotel-blue text-white font-semibold rounded-lg shadow-md hover:bg-hotel-blue-dark transition-colors">Salvar Contato</button></footer>
                </form>
            </div>
        </div>
    );
};

const ContactCard: React.FC<{contact: Contact; onEdit: (contact: Contact) => void; onDelete: (contactId: number) => void;}> = ({ contact, onEdit, onDelete }) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, contactId: number) => { e.dataTransfer.setData('contactId', String(contactId)); e.currentTarget.style.opacity = '0.4'; };
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => { e.currentTarget.style.opacity = '1'; };
    return (
        <div draggable onDragStart={(e) => handleDragStart(e, contact.id)} onDragEnd={handleDragEnd} className="p-3 mb-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 cursor-grab active:cursor-grabbing">
            <div className="flex justify-between items-start">
                <div><p className="font-bold text-sm text-hotel-blue-dark dark:text-hotel-blue-light">{contact.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">{contact.company || 'Sem empresa'}</p></div>
                <div className="flex gap-1 flex-shrink-0"><button onClick={() => onEdit(contact)} className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-600 rounded-full"><PencilIcon /></button><button onClick={() => confirm(`Tem certeza que deseja excluir ${contact.name}?`) && onDelete(contact.id)} className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-gray-600 rounded-full"><TrashIcon /></button></div>
            </div>
        </div>
    );
};

const KanbanColumn: React.FC<{title: ContactStatus; contacts: Contact[]; onDrop: (contactId: number, status: ContactStatus) => void; onEdit: (contact: Contact) => void; onDelete: (contactId: number) => void;}> = ({ title, contacts, onDrop, onEdit, onDelete }) => {
    const [isOver, setIsOver] = useState(false);
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsOver(true); };
    const handleDragLeave = () => setIsOver(false);
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); setIsOver(false);
        const contactId = Number(e.dataTransfer.getData('contactId'));
        if (contactId) onDrop(contactId, title);
    };
    return (
        <div className="flex-shrink-0 w-72 bg-gray-100 dark:bg-gray-800/80 rounded-xl">
            <h4 className="p-4 text-sm font-bold uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"><span>{title}</span><span className="text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{contacts.length}</span></h4>
            <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`p-2 min-h-[200px] h-full transition-colors duration-300 ${isOver ? 'bg-hotel-blue-light/30' : ''}`}>
                {contacts.map(contact => <ContactCard key={contact.id} contact={contact} onEdit={onEdit} onDelete={onDelete}/>)}
            </div>
        </div>
    );
};

const KanbanView: React.FC<{contacts: Contact[]; onEdit: (contact: Contact) => void;}> = ({ contacts, onEdit }) => {
    const { handleUpdateContact, handleDeleteContact } = useAppContext();
    const handleDropOnColumn = (contactId: number, newStatus: ContactStatus) => {
        const contactToUpdate = contacts.find(c => c.id === contactId);
        if (contactToUpdate && contactToUpdate.status !== newStatus) {
            handleUpdateContact({ ...contactToUpdate, status: newStatus, lastUpdate: new Date().toISOString() });
        }
    };
    return (
        <div className="flex gap-4 p-1 overflow-x-auto">
            {CONTACT_STATUSES.map(status => (
                <KanbanColumn key={status} title={status} contacts={contacts.filter(c => c.status === status)} onDrop={handleDropOnColumn} onEdit={onEdit} onDelete={handleDeleteContact}/>
            ))}
        </div>
    );
};

const ContactsPage: React.FC = () => {
    const { contacts, handleUpdateContact, handleAddContact, handleDeleteContact } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [editingContact, setEditingContact] = useState<Contact | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

    const filteredContacts = useMemo(() => {
        return contacts.filter(contact => 
            (searchTerm === '' || Object.values(contact).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase()))) &&
            (statusFilter === 'Todos' || contact.status === statusFilter)
        ).sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime());
    }, [contacts, searchTerm, statusFilter]);

    const handleEdit = (contact: Contact) => { setEditingContact(contact); setIsModalOpen(true); };
    const handleAddNew = () => { setEditingContact(null); setIsModalOpen(true); };
    const handleSave = (contact: Contact) => {
        if (contact.id && contacts.some(c => c.id === contact.id)) handleUpdateContact(contact);
        else handleAddContact(contact);
        setIsModalOpen(false);
    };
    const handleStatusChange = (contactId: number, newStatus: ContactStatus) => {
        const contactToUpdate = contacts.find(c => c.id === contactId);
        if (contactToUpdate) handleUpdateContact({ ...contactToUpdate, status: newStatus, lastUpdate: new Date().toISOString() });
    };

    return (
        <div className="p-4 md:p-8">
            <PageHeader title="Gerenciamento de Contatos">
                <div className="flex items-center gap-4">
                     <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg"><button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-hotel-blue text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`} title="Ver como Lista"><ListBulletIcon /></button><button onClick={() => setViewMode('kanban')} className={`p-2 rounded-md transition-colors ${viewMode === 'kanban' ? 'bg-hotel-blue text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`} title="Ver como Kanban"><Squares2x2Icon /></button></div>
                    <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-hotel-blue text-white font-semibold rounded-lg shadow-md hover:bg-hotel-blue-dark transition-colors">Adicionar Contato</button>
                </div>
            </PageHeader>
            <Section title={viewMode === 'list' ? "Todos os Contatos" : "Quadro de Contatos"}>
                <div className="flex flex-col md:flex-row gap-4 mb-4"><input type="text" placeholder="Buscar em todos os campos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 text-sm rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                    {viewMode === 'list' && (<select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full md:w-56 px-3 py-2 text-sm rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"><option value="Todos">Todos os Status</option>{CONTACT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select>)}
                </div>
                {viewMode === 'list' ? (
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-hotel-text dark:text-gray-300">
                            <thead className="text-xs text-hotel-blue-dark dark:text-hotel-blue-light uppercase bg-gray-50 dark:bg-gray-700"><tr><th className="px-4 py-3">Nome</th><th className="px-4 py-3">Empresa</th><th className="px-4 py-3">Contato</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Localidade</th><th className="px-4 py-3">Última Atualização</th><th className="px-4 py-3">Ações</th></tr></thead>
                            <tbody>{filteredContacts.map(contact => (<tr key={contact.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"><td className="px-4 py-2 font-medium whitespace-nowrap">{contact.name}</td><td className="px-4 py-2 whitespace-nowrap">{contact.company || '--'}</td><td className="px-4 py-2 whitespace-nowrap"><div className="truncate max-w-xs" title={contact.email}>{contact.email || ''}</div><div className="truncate max-w-xs text-xs text-gray-500 dark:text-gray-400" title={contact.phone}>{contact.phone || ''}</div></td><td className="px-4 py-2"><select value={contact.status} onChange={e => handleStatusChange(contact.id, e.target.value as ContactStatus)} className="w-full text-xs p-1 rounded-md border-gray-300 focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:text-white" onClick={(e) => e.stopPropagation()}>{CONTACT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></td><td className="px-4 py-2 whitespace-nowrap">{contact.location || '--'}</td><td className="px-4 py-2 whitespace-nowrap">{formatDate(contact.lastUpdate)}</td><td className="px-4 py-2"><div className="flex gap-2"><button onClick={() => handleEdit(contact)} className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 rounded"><PencilIcon /></button><button onClick={() => confirm(`Tem certeza que deseja excluir ${contact.name}?`) && handleDeleteContact(contact.id)} className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-gray-700 rounded"><TrashIcon /></button></div></td></tr>))}</tbody>
                        </table>
                        {filteredContacts.length === 0 && <p className="text-center text-gray-500 py-8">Nenhum contato encontrado.</p>}
                    </div>
                ) : (<KanbanView contacts={filteredContacts} onEdit={handleEdit} />)}
            </Section>
            <EditContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} contact={editingContact} onSave={handleSave}/>
        </div>
    );
};

// -------------------- Governança --------------------
const SuiteCard: React.FC<{ suite: SuiteStatus; onClick: () => void }> = ({ suite, onClick }) => {
    const statusConfig = { clean: { label: 'Limpo', icon: <CheckCircleIcon />, color: 'border-green-500 bg-green-50 dark:bg-green-900/20', textColor: 'text-green-600 dark:text-green-300' }, dirty: { label: 'Limpeza Necessária', icon: <ExclamationTriangleIcon />, color: 'border-orange-500 bg-orange-50 dark:bg-orange-900/20', textColor: 'text-orange-600 dark:text-orange-300' }, occupied: { label: 'Ocupado', icon: <BedIcon />, color: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20', textColor: 'text-blue-600 dark:text-blue-300' }, maintenance: { label: 'Manutenção', icon: <WrenchScrewdriverIcon />, color: 'border-red-500 bg-red-50 dark:bg-red-900/20', textColor: 'text-red-600 dark:text-red-300' } };
    const config = statusConfig[suite.status];
    return (
        <button onClick={onClick} disabled={suite.status === 'occupied'} className={`p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transition-all duration-300 border-2 ${config.color} ${suite.status !== 'occupied' ? 'hover:shadow-xl hover:scale-105' : 'cursor-not-allowed opacity-80'}`}>
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">{suite.name}</h4>
            <div className={`my-4 ${config.textColor}`}>{config.icon}</div>
            <p className={`font-semibold ${config.textColor}`}>{config.label}</p>
            {suite.status === 'occupied' && <div className="text-xs text-gray-500 dark:text-gray-400 mt-2"><p className="font-semibold truncate">{suite.guestName}</p><p>Saída: {suite.checkOutDate}</p></div>}
            {suite.status === 'maintenance' && suite.maintenanceReason && <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic truncate" title={suite.maintenanceReason}>Motivo: {suite.maintenanceReason}</div>}
        </button>
    );
};

const UpdateStatusModal: React.FC<{ isOpen: boolean, onClose: () => void, suite: SuiteStatus, onUpdate: (suiteId: number, newStatus: Partial<SuiteStatus>) => void }> = ({isOpen, onClose, suite, onUpdate}) => {
    const [status, setStatus] = useState(suite.status);
    const [reason, setReason] = useState(suite.maintenanceReason || '');
    if (!isOpen) return null;
    const handleSave = () => { onUpdate(suite.id, { status, maintenanceReason: status === 'maintenance' ? reason : undefined }); onClose(); };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                <header className="flex items-center justify-between p-4 border-b dark:border-gray-700"><h3 className="text-xl font-bold text-hotel-blue-dark dark:text-hotel-blue-light">Atualizar Status: {suite.name}</h3><button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><CloseIcon /></button></header>
                <div className="p-6 space-y-4">
                    <div><label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Novo Status</label><select id="status" value={status} onChange={(e) => setStatus(e.target.value as SuiteStatusOptions)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"><option value="clean">Limpo</option><option value="dirty">Limpeza Necessária</option><option value="maintenance">Manutenção</option></select></div>
                    {status === 'maintenance' && <div><label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Motivo da Manutenção</label><input type="text" id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Ex: Chuveiro quebrado" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>}
                </div>
                <footer className="flex items-center justify-end gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 rounded-b-xl"><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors">Cancelar</button><button onClick={handleSave} className="px-4 py-2 bg-hotel-blue text-white font-semibold rounded-lg shadow-md hover:bg-hotel-blue-dark transition-colors">Salvar Alterações</button></footer>
            </div>
        </div>
    );
};

const HousekeepingPage: React.FC = () => {
    const { suiteStatuses, reservations, handleUpdateSuiteStatus } = useAppContext();
    const [selectedSuite, setSelectedSuite] = useState<SuiteStatus | null>(null);

    const statusesWithReservationData = useMemo(() => {
        const today = new Date(); today.setUTCHours(0, 0, 0, 0);
        const activeReservationsBySuite = new Map<number, Reservation>();
        reservations.forEach(res => {
            if (res.status === 'Confirmada') {
                const checkIn = new Date(res.checkIn); const checkOut = new Date(res.checkOut);
                checkIn.setUTCHours(0, 0, 0, 0); checkOut.setUTCHours(0, 0, 0, 0);
                if (today >= checkIn && today < checkOut) {
                    let numSuites = 0;
                    if(res.accommodation.toLowerCase().includes('hotel completo') || res.accommodation.toLowerCase().includes('pousada total')) numSuites = TOTAL_SUITES;
                    else {
                        const match = res.description.toLowerCase().match(/(\d+)\s*su[íi]tes?/);
                        if (match && match[1]) numSuites = parseInt(match[1], 10);
                        else if (res.accommodation.toLowerCase().includes('suíte') || res.description.toLowerCase().includes('suíte')) numSuites = 1;
                    }
                    for(let i=1; i <= numSuites; i++) {
                        if (!activeReservationsBySuite.has(i)) activeReservationsBySuite.set(i, res);
                    }
                }
            }
        });
        return suiteStatuses.map((suite): SuiteStatus => {
            const activeReservation = activeReservationsBySuite.get(suite.id);
            if (activeReservation) return { ...suite, status: 'occupied', guestName: activeReservation.guestName, checkOutDate: formatDate(activeReservation.checkOut) };
            return suite;
        });
    }, [suiteStatuses, reservations]);

    return (
        <div className="p-4 md:p-8">
            <PageHeader title="Governança e Status dos Apartamentos" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {statusesWithReservationData.map(suite => <SuiteCard key={suite.id} suite={suite} onClick={() => setSelectedSuite(suite)}/>)}
            </div>
            {selectedSuite && <UpdateStatusModal isOpen={!!selectedSuite} onClose={() => setSelectedSuite(null)} suite={selectedSuite} onUpdate={handleUpdateSuiteStatus}/>}
        </div>
    );
};

// -------------------- Financeiro --------------------
const AddEditCostModal: React.FC<{isOpen: boolean; onClose: () => void; onSave: (cost: Omit<Cost, 'id'> | Cost) => void; cost: Cost | null; }> = ({ isOpen, onClose, onSave, cost }) => {
    const [formData, setFormData] = useState<Partial<Cost>>({});
    useEffect(() => { setFormData(cost || { description: '', type: 'Variável', category: 'Outros', amount: 0, date: formatDateForInput(new Date().toISOString()) }); }, [cost, isOpen]);
    if (!isOpen) return null;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let finalValue: string | number = value;
        if (type === 'number') finalValue = parseFloat(value) || 0;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave({ ...cost, ...formData, id: cost?.id || Date.now() } as Cost); onClose(); };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b dark:border-gray-700"><h3 className="text-xl font-bold text-hotel-blue-dark dark:text-hotel-blue-light">{cost ? 'Editar Custo' : 'Adicionar Novo Custo'}</h3><button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><CloseIcon /></button></header>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div><label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label><input type="text" name="description" id="description" required value={formData.description || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor (R$)</label><input type="number" name="amount" id="amount" required min="0" step="0.01" value={formData.amount || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data</label><input type="date" name="date" id="date" required value={formatDateForInput(formData.date || '')} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/></div>
                        <div><label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoria</label><select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{COST_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                        <div><label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label><select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{COST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    </div>
                    <footer className="flex items-center justify-end gap-4 pt-4 border-t dark:border-gray-700"><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors">Cancelar</button><button type="submit" className="px-4 py-2 bg-hotel-blue text-white font-semibold rounded-lg shadow-md hover:bg-hotel-blue-dark transition-colors">Salvar Custo</button></footer>
                </form>
            </div>
        </div>
    );
};

const CostsTable: React.FC<{costs: Cost[]; onEdit: (cost: Cost) => void; onDelete: (costId: number) => void;}> = ({ costs, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto"><table className="w-full text-sm text-left text-hotel-text dark:text-gray-300"><thead className="text-xs text-hotel-blue-dark dark:text-hotel-blue-light uppercase bg-gray-50 dark:bg-gray-700"><tr><th className="px-4 py-3">Data</th><th className="px-4 py-3">Descrição</th><th className="px-4 py-3">Categoria</th><th className="px-4 py-3">Tipo</th><th className="px-4 py-3 text-right">Valor</th><th className="px-4 py-3">Ações</th></tr></thead><tbody>{costs.map(cost => (<tr key={cost.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"><td className="px-4 py-2 whitespace-nowrap">{formatDate(cost.date)}</td><td className="px-4 py-2 font-medium">{cost.description}</td><td className="px-4 py-2 whitespace-nowrap">{cost.category}</td><td className="px-4 py-2 whitespace-nowrap">{cost.type}</td><td className="px-4 py-2 font-semibold text-right">{formatCurrency(cost.amount)}</td><td className="px-4 py-2"><div className="flex gap-2"><button onClick={() => onEdit(cost)} className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 rounded"><PencilIcon /></button><button onClick={() => confirm(`Tem certeza que deseja excluir este custo?`) && onDelete(cost.id)} className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-gray-700 rounded"><TrashIcon /></button></div></td></tr>))}</tbody></table>{costs.length === 0 && <p className="text-center text-gray-500 py-8">Nenhum custo lançado para este período.</p>}</div>
    );
};

const FinancialPage: React.FC = () => {
    const { reservations: allReservations, costs: allCosts, handleAddCost, handleUpdateCost, handleDeleteCost } = useAppContext();
    const [selectedYear, setSelectedYear] = useState<'all' | number>(new Date().getFullYear());
    const [isCostModalOpen, setIsCostModalOpen] = useState(false);
    const [editingCost, setEditingCost] = useState<Cost | null>(null);

    const { years, costs, monthlyRevenue, totalRevenue, totalCosts, grossProfit, profitMargin, revenueByChannel } = useMemo(() => {
        const yearSet = new Set([...allReservations.map(r => new Date(r.checkIn).getFullYear()), ...allCosts.map(c => new Date(c.date).getFullYear())]);
        const years = ['all', ...Array.from(yearSet).sort((a,b) => b-a)];
        const reservations = selectedYear === 'all' ? allReservations : allReservations.filter(r => new Date(r.checkIn).getFullYear() === selectedYear);
        const costs = selectedYear === 'all' ? allCosts : allCosts.filter(c => new Date(c.date).getFullYear() === selectedYear);
        const { totalRevenue, revenueByChannel } = getDashboardMetrics(reservations, selectedYear, allReservations);
        const totalCosts = costs.reduce((acc, cost) => acc + cost.amount, 0);
        const grossProfit = totalRevenue - totalCosts;
        const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
        const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({ label: new Date(0, i).toLocaleString('pt-BR', { month: 'short' }).replace('.', ''), value: 0 }));
        reservations.forEach(res => { if (res.status === 'Confirmada') monthlyRevenue[new Date(res.checkIn).getUTCMonth()].value += res.totalRevenue; });
        return { years, costs, revenueByChannel, monthlyRevenue, totalRevenue, totalCosts, grossProfit, profitMargin };
    }, [allReservations, allCosts, selectedYear]);
    
    const handleSaveCost = (costData: Omit<Cost, 'id'> | Cost) => { 'id' in costData ? handleUpdateCost(costData) : handleAddCost(costData); setIsCostModalOpen(false); };
    const handleEditCost = (cost: Cost) => { setEditingCost(cost); setIsCostModalOpen(true); };
    const handleAddNewCost = () => { setEditingCost(null); setIsCostModalOpen(true); };

    return (
        <div className="p-4 md:p-8 space-y-8">
            <PageHeader title="Painel Financeiro"><div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">{years.map(year => (<button key={year} onClick={() => setSelectedYear(year as any)} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${selectedYear === year ? 'bg-hotel-blue text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{year === 'all' ? 'Total' : year}</button>))}</div></PageHeader>
            <Section title="Resumo de Lucratividade"><div className="grid grid-cols-2 md:grid-cols-4 gap-4"><KpiCard title="Receita Total" value={formatCurrency(totalRevenue)} icon={<DollarIcon />} colorClass="bg-blue-600" /><KpiCard title="Custos Totais" value={formatCurrency(totalCosts)} icon={<ArrowTrendingDownIcon />} colorClass="bg-red-600" /><KpiCard title="Lucro Bruto" value={formatCurrency(grossProfit)} icon={<ChartPieIcon />} colorClass="bg-green-600" /><KpiCard title="Margem de Lucro" value={`${profitMargin.toFixed(1)}%`} icon={<ScaleIcon />} colorClass="bg-purple-600" /></div></Section>
            <Section title="Lançamentos de Custos"><div className="flex justify-end mb-4"><button onClick={handleAddNewCost} className="flex items-center gap-2 px-4 py-2 bg-hotel-blue text-white font-semibold rounded-lg shadow-md hover:bg-hotel-blue-dark transition-colors">Adicionar Custo</button></div><CostsTable costs={costs} onEdit={handleEditCost} onDelete={handleDeleteCost} /></Section>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6"><div className="lg:col-span-3"><Section title="Receita Mensal (Faturamento Confirmado)"><VerticalBarChart data={monthlyRevenue} /></Section></div><div className="lg:col-span-2"><Section title="Receita por Canal de Reserva"><SimpleBarChart data={revenueByChannel} currency /></Section></div></div>
            <AddEditCostModal isOpen={isCostModalOpen} onClose={() => setIsCostModalOpen(false)} cost={editingCost} onSave={handleSaveCost}/>
        </div>
    );
};

// -------------------- Configurações & Login --------------------
const SettingsPage: React.FC = () => {
    const { loggedInUser, apiBaseUrl, setApiBaseUrl, apiKey, setApiKey } = useAppContext();
    return (
        <div className="p-4 md:p-8 space-y-8">
            <PageHeader title="Configurações" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Section title="Acesso e Segurança"><div className="space-y-4"><p>Você está logado como: <strong className="text-hotel-blue-dark dark:text-hotel-blue-light">{loggedInUser}</strong></p><h4 className="text-lg font-semibold pt-4 border-t border-gray-200 dark:border-gray-700">Gerenciamento de Usuários</h4><p className="text-sm text-gray-500">Funcionalidade a ser implementada.</p><button disabled className="mt-2 px-4 py-2 text-sm font-semibold bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">Adicionar Novo Usuário</button></div></Section>
                <Section title="Integração de API (Backend / N8N)">
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Configure a URL da API onde os dados serão salvos. O N8N deve interagir com este mesmo endpoint.</p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL Base da API</label>
                            <input 
                                type="text" 
                                value={apiBaseUrl} 
                                onChange={(e) => setApiBaseUrl(e.target.value)} 
                                placeholder="https://sua-api.com/api"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Chave de API (Opcional)</label>
                            <input 
                                type="password" 
                                value={apiKey} 
                                onChange={(e) => setApiKey(e.target.value)} 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                            * Se configurado, o sistema tentará sincronizar dados com esta URL.
                        </p>
                    </div>
                </Section>
            </div>
        </div>
    );
};

const LoginPage: React.FC<{ onLogin: (user: string, pass: string) => boolean, isDarkMode: boolean, onToggleDarkMode: () => void }> = ({ onLogin, isDarkMode, onToggleDarkMode }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        // Simulate API call for better UX
        setTimeout(() => {
            if (!onLogin(login, password)) {
                setError('Credenciais inválidas. Tente novamente.');
                setPassword('');
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 font-sans ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-hotel-slate-light text-hotel-text'}`}>
            <div className="absolute top-4 right-4"><button onClick={onToggleDarkMode} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-white/50'} transition-colors`} aria-label={isDarkMode ? "Ativar tema claro" : "Ativar tema escuro"}>{isDarkMode ? <SunIcon /> : <MoonIcon />}</button></div>
            <div className="w-full max-w-md mx-auto p-8"><div className="text-center mb-8"><div className="inline-flex items-center justify-center bg-hotel-blue text-white rounded-full h-16 w-16 mb-4"><BuildingIcon /></div><h1 className="text-3xl font-bold text-hotel-blue-dark dark:text-hotel-blue-light">Hotel Palace Serra Verde Imperial</h1><p className="text-gray-600 dark:text-gray-300 mt-1">Bem-vindo(a) ao seu painel de controle corporativo.</p></div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div><label htmlFor="login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Login</label><input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Admin"/></div>
                        <div><label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label><input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="••••••••"/></div>
                        {error && (<p className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 p-3 rounded-md text-center">{error}</p>)}
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-hotel-blue hover:bg-hotel-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hotel-blue-dark transition-colors disabled:bg-hotel-blue/70 disabled:cursor-not-allowed">{isLoading ? 'Entrando...' : 'Entrar'}</button>
                    </form>
                </div><p className="text-center text-xs text-gray-500 mt-8">© {new Date().getFullYear()} Hotel Palace Serra Verde Imperial - Sistema de Gestão.</p>
            </div>
        </div>
    );
};


// ============================================================================
// 8. LÓGICA PRINCIPAL DA APLICAÇÃO (Main App Logic & Provider)
// ============================================================================
const useAppLogic = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [suiteStatuses, setSuiteStatuses] = useState<SuiteStatus[]>(initialSuiteStatuses);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [costs, setCosts] = useState<Cost[]>(initialCosts);
  const [apiBaseUrl, setApiBaseUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  const [contacts, setContacts] = useState<Contact[]>(() => {
    const contactMap = new Map<string, Contact>();
    initialContactsData.forEach(c => contactMap.set(`${c.name.toLowerCase()}|${(c.phone || c.email || '').toLowerCase()}`, c));
    initialReservations.forEach(res => {
        if (!res.guestName) return;
        const key = `${res.guestName.toLowerCase()}|${(res.contact || '').toLowerCase()}`;
        if (contactMap.has(key)) {
            const existing = contactMap.get(key)!;
            if (res.status === 'Confirmada') { existing.status = 'Hóspede'; existing.lastUpdate = res.checkIn > existing.lastUpdate ? res.checkIn : existing.lastUpdate; }
        } else {
            contactMap.set(key, { id: res.id + 1000, name: res.guestName, phone: res.contact, status: 'Hóspede', createdAt: res.checkIn, lastUpdate: res.checkIn, notes: res.observations });
        }
    });
    return Array.from(contactMap.values());
  });

  // Effect to Poll API Data if URL is present
  useEffect(() => {
    if (!apiBaseUrl) return;

    const fetchData = async () => {
        try {
            const headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

            const res = await fetch(`${apiBaseUrl}/reservations`, { headers });
            if (res.ok) {
                const data = await res.json();
                // Assuming API returns array of reservations
                if (Array.isArray(data)) {
                    setReservations(data);
                }
            }
        } catch (error) {
            console.error("Erro ao buscar dados da API:", error);
        }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Poll every minute
    return () => clearInterval(interval);
  }, [apiBaseUrl, apiKey]);


  useEffect(() => {
    // Closes the sidebar when resizing to a desktop view to prevent UI inconsistencies.
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Corresponds to Tailwind's 'md' breakpoint
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Locks the body scroll when the off-canvas menu is open on mobile.
    if (isSidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isSidebarOpen]);

  const toggleDarkMode = () => setIsDarkMode(prev => {
    document.documentElement.classList.toggle('dark', !prev);
    return !prev;
  });

  const handleLogin = (login: string, pass: string): boolean => {
    // Login Dione Adicionado
    if (login.toLowerCase() === 'dione' && pass === '12345678') {
        setLoggedInUser('Dione');
        return true;
    }
    // Mantendo credenciais originais para compatibilidade
    if ((login === 'Larissa' && pass === 'Knupp24') || (login === 'Mara' && pass === '@me19591959') || (login === 'Admin' && pass === 'admin')) {
        setLoggedInUser(login);
        return true;
    }
    return false;
  };
  const handleLogout = () => setLoggedInUser(null);
  
  const handleAddReservation = async (newResData: NewReservationData) => {
    const checkInDate = new Date(newResData.checkIn);
    const checkOutDate = new Date(newResData.checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))); 
    const newReservation: Reservation = { ...newResData, id: Date.now(), numberOfNights: diffDays, amountPending: newResData.totalRevenue - newResData.amountPaid, downPayment: newResData.amountPaid > 0 };
    
    // Update Local State immediately for responsiveness
    setReservations(prev => [...prev, newReservation]);

    // Update Contact Logic (Local)
    setContacts(prev => {
        const exists = prev.some(c => 
            c.name.trim().toLowerCase() === newResData.guestName.trim().toLowerCase() || 
            (newResData.contact && (c.phone === newResData.contact || c.email === newResData.contact))
        );
        if (!exists) {
            return [...prev, {
                id: Date.now() + 1,
                name: newResData.guestName,
                phone: newResData.contact, // Simplificado
                status: 'Hóspede',
                notes: 'Criado via Reserva',
                createdAt: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            }];
        }
        return prev;
    });

    // API Sync if configured
    if (apiBaseUrl) {
        try {
            const headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
            await fetch(`${apiBaseUrl}/reservations`, {
                method: 'POST',
                headers,
                body: JSON.stringify(newReservation)
            });
        } catch (e) {
            console.error("Failed to sync reservation to API", e);
        }
    }
  };

  const handleDeleteReservation = (id: number) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    // If API is configured, also send delete request
    if (apiBaseUrl) {
        try {
            const headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
            fetch(`${apiBaseUrl}/reservations/${id}`, { method: 'DELETE', headers }).catch(e => console.error(e));
        } catch (e) {
             console.error("Failed to sync delete to API", e);
        }
    }
  };
  
  const handleUpdateSuiteStatus = (suiteId: number, newStatusData: Partial<SuiteStatus>) => {
    setSuiteStatuses(prev => prev.map(s => s.id === suiteId ? { ...s, ...newStatusData } : s));
  };
  const handleUpdateContact = (updatedContact: Contact) => setContacts(prev => prev.map(c => c.id === updatedContact.id ? updatedContact : c));
  const handleAddContact = (newContact: Contact) => setContacts(prev => [...prev, { ...newContact, id: Math.max(...prev.map(c => c.id), 0) + 1 }]);
  const handleDeleteContact = (contactId: number) => setContacts(prev => prev.filter(c => c.id !== contactId));
  const handleAddCost = (newCostData: Omit<Cost, 'id'>) => setCosts(prev => [...prev, { ...newCostData, id: Date.now() }]);
  const handleUpdateCost = (updatedCost: Cost) => setCosts(prev => prev.map(c => c.id === updatedCost.id ? updatedCost : c));
  const handleDeleteCost = (costId: number) => setCosts(prev => prev.filter(c => c.id !== costId));

  useEffect(() => {
    document.body.className = 'bg-hotel-slate-light text-hotel-text dark:bg-gray-900 dark:text-gray-100';
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('input, textarea, select')) return;
      if (event.altKey) {
        const keyMap: Record<string, View> = { d: 'dashboard', r: 'reservations', f: 'financial', o: 'contacts', g: 'governance', c: 'settings' };
        if (event.key === 't') toggleDarkMode();
        else if (loggedInUser && keyMap[event.key]) setCurrentView(keyMap[event.key]);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [loggedInUser]);

  return {
    isDarkMode, toggleDarkMode, currentView, setCurrentView, isSidebarOpen, setIsSidebarOpen, reservations, suiteStatuses,
    costs, contacts, loggedInUser, handleLogin, handleLogout, handleAddReservation, handleDeleteReservation,
    handleUpdateSuiteStatus, handleUpdateContact, handleAddContact, handleDeleteContact,
    handleAddCost, handleUpdateCost, handleDeleteCost,
    apiBaseUrl, setApiBaseUrl, apiKey, setApiKey
  };
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const logic = useAppLogic();
    return <AppContext.Provider value={logic}>{children}</AppContext.Provider>;
};

// ============================================================================
// 9. COMPONENTE PRINCIPAL (Main App Component)
// ============================================================================
const MainAppLayout: React.FC = () => {
    const { isDarkMode, toggleDarkMode, currentView, setCurrentView, loggedInUser, handleLogout, isSidebarOpen, setIsSidebarOpen } = useAppContext();
    const navItems = [
        { id: 'dashboard', label: 'Visão Geral', icon: <HomeIcon /> },
        { id: 'reservations', label: 'Reservas', icon: <CalendarIcon /> },
        { id: 'financial', label: 'Financeiro', icon: <BanknotesIcon /> },
        { id: 'contacts', label: 'Contatos', icon: <UsersIcon /> },
        { id: 'governance', label: 'Governança', icon: <BroomIcon /> },
        { id: 'settings', label: 'Configurações', icon: <Cog6ToothIcon /> },
    ];
    const renderView = () => {
        switch (currentView) {
            case 'dashboard': return <DashboardPage />;
            case 'reservations': return <ReservationsPage />;
            case 'financial': return <FinancialPage />;
            case 'contacts': return <ContactsPage />;
            case 'governance': return <HousekeepingPage />;
            case 'settings': return <SettingsPage />;
            default: return <DashboardPage />;
        }
    };
    return (
        <div className="min-h-screen flex flex-col transition-colors duration-300 font-sans">
            <header className={`p-4 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-hotel-blue'} text-white flex items-center justify-between`}>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 -ml-2 rounded-full hover:bg-white/20 transition-colors" aria-label="Abrir menu">
                        <Bars3Icon />
                    </button>
                    <BuildingIcon />
                    <h1 className="text-xl md:text-2xl font-semibold">Hotel Palace Serra Verde Imperial</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm hidden md:inline">Olá, <strong>{loggedInUser}</strong></span>
                    <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-white/20 transition-colors" aria-label={isDarkMode ? "Ativar tema claro" : "Ativar tema escuro"}>{isDarkMode ? <SunIcon /> : <MoonIcon />}</button>
                    <button onClick={handleLogout} className="p-2 rounded-full hover:bg-white/20 transition-colors" aria-label="Sair"><ArrowLeftOnRectangleIcon /></button>
                </div>
            </header>
            <div className="flex flex-1 overflow-hidden">
                {/* Overlay for mobile */}
                {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-30 md:hidden" aria-hidden="true" />}
                
                <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 p-4 space-y-4 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:shadow-none ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} ${isDarkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'}`}>
                    {navItems.map(item => (
                        <button 
                            key={item.id} 
                            onClick={() => {
                                setCurrentView(item.id as View);
                                setIsSidebarOpen(false);
                            }} 
                            title={item.label} 
                            className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${currentView === item.id ? (isDarkMode ? 'bg-hotel-blue-dark text-white' : 'bg-hotel-blue text-white') : (isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-hotel-blue/10 text-hotel-text')}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </aside>
                <main className="flex-1 overflow-y-auto">{renderView()}</main>
            </div>
            <footer className={`p-4 text-center text-sm ${isDarkMode ? 'bg-gray-800/50 border-t border-gray-700 text-gray-400' : 'bg-gray-100 border-t border-gray-200 text-gray-500'}`}>© {new Date().getFullYear()} Hotel Palace Serra Verde Imperial - Sistema de Gestão.</footer>
        </div>
    );
};

const App: React.FC = () => {
    const { loggedInUser, handleLogin, isDarkMode, toggleDarkMode } = useAppContext();
    if (!loggedInUser) {
        return <LoginPage onLogin={handleLogin} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
    }
    return <MainAppLayout />;
};

// ============================================================================
// 10. RENDERIZAÇÃO (App Render)
// ============================================================================
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  );
} else {
  console.error("Elemento root não encontrado no DOM.");
}
