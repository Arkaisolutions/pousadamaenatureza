/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import './index.css';
import React, { useState, useMemo, useEffect, createContext, useContext, useCallback } from 'react';
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257-1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.57 6.57 0 01-.22.127c-.332.183-.582.495-.645.87l-.213-1.281c-.09.542-.56.94-1.11-.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313.686-.645-.87-.074-.04-.147-.083-.22-.127-.324.196-.72.257-1.075.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.003-.827c.293-.24.438.613-.438.995s-.145-.755-.438-.995l-1.003-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37.49l1.217.456c.355.133.75.072 1.075.124.074-.04.147-.083.22-.127.332-.183-.582-.495-.645-.87l.213-1.281z" />
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
const CloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
);
const CloudSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M9.75 9.75a3 3 0 004.5 4.5m-6.75-2.25a5.25 5.25 0 017.42-7.42m2.81 2.81a3 3 0 013.77 3.86l-1.5 1.5M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 012.33-1.463M18 19.5h-9" />
    </svg>
);


// ============================================================================
// 2. TIPOS E CONSTANTES (Types & Constants)
// ============================================================================
type ReservationStatus = 'Confirmada' | 'Cancelada' | 'Pendente';
interface Reservation {
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
    status: string; // Changed to string to match interface flexibility, but commonly ReservationStatus
}

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

type SyncStatus = 'connected' | 'offline' | 'syncing' | 'error';

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
  // Pr. Wilson Santos
  { id: 2, guestName: "Pr. Wilson Santos e esposa Martha", contact: "", accommodation: "Suíte Casal", bookingChannel: "WhatsApp", description: "1 diária", adults: 2, children: 0, extraBed: false, breakfast: true, checkIn: "2026-02-06", checkOut: "2026-02-07", numberOfNights: 1, totalRevenue: 297, amountPaid: 0, observations: "", status: 'Confirmada' },
  
  // Leise Franciele Silla
  { id: 3, guestName: "Leise Franciele Silla", contact: "Leisefranciele10@hotmail.com", accommodation: "Suíte Casal", bookingChannel: "WhatsApp", description: "3 diárias", adults: 2, children: 0, extraBed: false, breakfast: true, checkIn: "2026-02-07", checkOut: "2026-02-10", numberOfNights: 3, totalRevenue: 891, amountPaid: 0, observations: "Dourados MS. CPF: 008.417.759-40", status: 'Confirmada' },
  
  // José Ronald
  { id: 4, guestName: "José Ronald Rangel Ribeiro", contact: "", accommodation: "Suíte Individual", bookingChannel: "WhatsApp", description: "Carnaval 3 diárias", adults: 1, children: 0, extraBed: false, breakfast: true, checkIn: "2026-02-13", checkOut: "2026-02-16", numberOfNights: 3, totalRevenue: 891, amountPaid: 450, observations: "CPF 95507841772. Valor a confirmar.", status: 'Confirmada' },
  
  // Kecia da Silva Monteiro
  { id: 5, guestName: "Kecia da Silva Monteiro", contact: "keciamonteiro10@gmail.com", accommodation: "Suíte Standard", bookingChannel: "Whatsapp", description: "Pax: 2 pessoas", adults: 2, children: 0, extraBed: false, breakfast: true, checkIn: "2026-02-14", checkOut: "2026-02-21", numberOfNights: 7, totalRevenue: 1508, amountPaid: 754, observations: "End: Rua Fernando Costa Machado 49 Maceió Niterói. Acomp: Kecia da Silva Monteiro (CPF 185.334.627-60, Email: Keciamonteiro10@gmail.com)", status: 'Confirmada' },
  
  // Alyson Crystiano
  { id: 6, guestName: "Alyson Crystiano de Moraes Damião", contact: "", accommodation: "Quarto Deluxe e Suíte Deluxe (214, 208)", bookingChannel: "WhatsApp", description: "4 pessoas - Carnaval", adults: 4, children: 0, extraBed: false, breakfast: true, checkIn: "2026-02-13", checkOut: "2026-02-18", numberOfNights: 5, totalRevenue: 3240, amountPaid: 1620, observations: "50% pago. Suítes 214 e 208.", status: 'Confirmada' },

  // Antônio Carlos Braga
  { id: 7, guestName: "Antônio Carlos Braga", contact: "antoniocarlos68@gmail.com", accommodation: "Suíte Standard", bookingChannel: "Whatsapp", description: "Pax: 2 pessoas", adults: 2, children: 0, extraBed: false, breakfast: true, checkIn: "2026-02-14", checkOut: "2026-02-21", numberOfNights: 7, totalRevenue: 1500, amountPaid: 750, observations: "50% pago.", status: 'Confirmada' },

  // Paulo Sergio da Cruz
  { id: 8, guestName: "Paulo Sergio da Cruz", contact: "", accommodation: "Quarto Deluxe ", bookingChannel: "WhatsApp", description: "2 pessoas - Carnaval", adults: 2, children: 0, extraBed: false, breakfast: true, checkIn: "2026-02-13", checkOut: "2026-02-18", numberOfNights: 3, totalRevenue: 1200, amountPaid: 600, observations: "50% pago.", status: 'Confirmada' },
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
    handleExportData: () => void;
    handleImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    syncStatus: SyncStatus;
    forceSync: () => void;
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

// -------------------- Configurações & Login --------------------
const SettingsPage: React.FC = () => {
    const { loggedInUser, apiBaseUrl, setApiBaseUrl, apiKey, setApiKey, handleExportData, handleImportData, syncStatus, forceSync } = useAppContext();
    return (
        <div className="p-4 md:p-8 space-y-8">
            <PageHeader title="Configurações" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Section title="Acesso e Segurança"><div className="space-y-4"><p>Você está logado como: <strong className="text-hotel-blue-dark dark:text-hotel-blue-light">{loggedInUser}</strong></p><h4 className="text-lg font-semibold pt-4 border-t border-gray-200 dark:border-gray-700">Gerenciamento de Usuários</h4><p className="text-sm text-gray-500">Funcionalidade a ser implementada.</p><button disabled className="mt-2 px-4 py-2 text-sm font-semibold bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">Adicionar Novo Usuário</button></div></Section>
                <Section title="Backup e Exportação">
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Exporte os dados para enviar o relatório de comissões ou faça um backup.
                        </p>
                        <div className="flex flex-col gap-4">
                            <button onClick={handleExportData} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-hotel-blue text-white font-bold rounded-lg shadow hover:bg-hotel-blue-dark transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Exportar Backup (JSON)
                            </button>
                            
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Restaurar Dados (Importar)</label>
                                <input 
                                    type="file" 
                                    accept=".json"
                                    onChange={handleImportData}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300"
                                />
                            </div>
                        </div>
                    </div>
                </Section>
                <Section title="Conexão com Servidor VPS (Postgres)">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Configure a API para sincronizar Larissa e Dione.</p>
                            <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${syncStatus === 'connected' ? 'bg-green-100 text-green-800' : syncStatus === 'error' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                {syncStatus === 'connected' ? 'Conectado' : syncStatus === 'error' ? 'Erro' : 'Offline'}
                            </span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL da API (VPS)</label>
                            <input 
                                type="text" 
                                value={apiBaseUrl} 
                                onChange={(e) => setApiBaseUrl(e.target.value)} 
                                placeholder="https://api.seuhotel.com.br"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Chave de Segurança (API Key)</label>
                            <input 
                                type="password" 
                                value={apiKey} 
                                onChange={(e) => setApiKey(e.target.value)} 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-hotel-blue focus:ring-hotel-blue bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <button onClick={forceSync} className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline">Testar Conexão e Sincronizar Agora</button>
                        <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-700/50 p-3 rounded mt-2">
                            <strong>Instruções para TI:</strong><br/>
                            Aponte para o backend que conecta no Postgres.<br/>
                            Endpoints esperados: GET/POST em <code>/reservations</code>, <code>/costs</code>, etc.
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
};

const ReservationsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="p-4 md:p-8 space-y-8">
            <PageHeader title="Reservas">
                <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-hotel-blue text-white rounded-lg hover:bg-hotel-blue-dark transition-colors flex items-center gap-2 shadow-md">
                   <span className="text-lg leading-none">+</span> Nova Reserva
                </button>
            </PageHeader>
            <div className="space-y-6">
                <Section title="Calendário de Ocupação">
                    <MonthlyCalendarView />
                </Section>
                <Section title="Lista de Reservas">
                    <ReservationsTable />
                </Section>
            </div>
            <AddReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

const FinancialPage: React.FC = () => {
    const { costs, handleAddCost, handleDeleteCost } = useAppContext();
    const [newCost, setNewCost] = useState({ description: '', category: 'Outros' as CostCategory, type: 'Variável' as CostType, amount: 0, date: new Date().toISOString().split('T')[0] });
    
    const totalExpenses = costs.reduce((acc, c) => acc + c.amount, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddCost(newCost);
        setNewCost({ description: '', category: 'Outros', type: 'Variável', amount: 0, date: new Date().toISOString().split('T')[0] });
    };

    return (
        <div className="p-4 md:p-8 space-y-8">
            <PageHeader title="Financeiro" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-1 space-y-6">
                    <KpiCard title="Total Despesas" value={formatCurrency(totalExpenses)} icon={<DollarIcon />} colorClass="bg-red-600" />
                    <Section title="Nova Despesa">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase">Descrição</label>
                                <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" value={newCost.description} onChange={e => setNewCost({...newCost, description: e.target.value})} required />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Categoria</label>
                                    <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" value={newCost.category} onChange={e => setNewCost({...newCost, category: e.target.value as CostCategory})}>
                                        {COST_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Tipo</label>
                                    <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" value={newCost.type} onChange={e => setNewCost({...newCost, type: e.target.value as CostType})}>
                                        {COST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Valor</label>
                                    <input type="number" step="0.01" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" value={newCost.amount || ''} onChange={e => setNewCost({...newCost, amount: parseFloat(e.target.value)})} required />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Data</label>
                                    <input type="date" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" value={newCost.date} onChange={e => setNewCost({...newCost, date: e.target.value})} required />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-hotel-blue text-white p-2 rounded hover:bg-hotel-blue-dark font-semibold shadow">Adicionar Despesa</button>
                        </form>
                    </Section>
                 </div>
                 <div className="lg:col-span-2">
                    <Section title="Histórico de Custos">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-4 py-3">Data</th>
                                        <th className="px-4 py-3">Descrição</th>
                                        <th className="px-4 py-3">Categoria</th>
                                        <th className="px-4 py-3">Valor</th>
                                        <th className="px-4 py-3 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {costs.length === 0 ? <tr><td colSpan={5} className="text-center py-4">Nenhuma despesa registrada.</td></tr> :
                                    costs.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(cost => (
                                        <tr key={cost.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-4 py-3">{formatDate(cost.date)}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{cost.description}</td>
                                            <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-600">{cost.category}</span></td>
                                            <td className="px-4 py-3 font-bold text-red-600 dark:text-red-400">{formatCurrency(cost.amount)}</td>
                                            <td className="px-4 py-3 text-right">
                                                <button onClick={() => { if(confirm('Excluir esta despesa?')) handleDeleteCost(cost.id); }} className="text-red-500 hover:text-red-700 p-1"><TrashIcon /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Section>
                 </div>
            </div>
        </div>
    );
};

const ContactForm: React.FC<{onClose: () => void}> = ({onClose}) => {
    const { handleAddContact } = useAppContext();
    const [formData, setFormData] = useState<any>({ name: '', company: '', email: '', phone: '', status: 'Novo', location: '', notes: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddContact({...formData, createdAt: new Date().toISOString(), lastUpdate: new Date().toISOString() });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg space-y-4 border dark:border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" placeholder="Nome do Contato *" required className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} value={formData.name} />
                <input name="company" placeholder="Empresa / Agência" className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} value={formData.company} />
                <input name="email" type="email" placeholder="Email" className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} value={formData.email} />
                <input name="phone" placeholder="Telefone / WhatsApp" className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} value={formData.phone} />
                <select name="status" className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} value={formData.status}>
                    {CONTACT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <input name="location" placeholder="Cidade / Estado" className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} value={formData.location} />
            </div>
            <textarea name="notes" placeholder="Observações importantes..." className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600" rows={3} onChange={handleChange} value={formData.notes}></textarea>
            <div className="flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-hotel-blue text-white rounded hover:bg-hotel-blue-dark transition-colors font-semibold">Salvar Contato</button>
            </div>
        </form>
    );
};

const ContactsPage: React.FC = () => {
    const { contacts, handleDeleteContact } = useAppContext();
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="p-4 md:p-8 space-y-8">
            <PageHeader title="Contatos / CRM">
                 <button onClick={() => setIsFormOpen(!isFormOpen)} className="px-4 py-2 bg-hotel-blue text-white rounded-lg hover:bg-hotel-blue-dark transition-colors shadow">
                    {isFormOpen ? 'Cancelar' : '+ Novo Contato'}
                </button>
            </PageHeader>
            
            {isFormOpen && (
                <Section title="Adicionar Novo Contato">
                     <ContactForm onClose={() => setIsFormOpen(false)} />
                </Section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map(contact => (
                    <div key={contact.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-lg text-hotel-blue-dark dark:text-hotel-blue-light truncate pr-2">{contact.name}</h4>
                                <span className={`flex-shrink-0 px-2 py-0.5 text-xs rounded-full font-semibold ${contact.status === 'Novo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{contact.status}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">{contact.company || 'Particular'}</p>
                            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2"><span className="w-4"><UsersIcon /></span> {contact.email || 'Sem email'}</div>
                                <div className="flex items-center gap-2"><span className="w-4"><ListBulletIcon /></span> {contact.phone || 'Sem telefone'}</div>
                                {contact.location && <div className="flex items-center gap-2"><span className="w-4"><HomeIcon /></span> {contact.location}</div>}
                            </div>
                            {contact.notes && <p className="mt-4 text-xs italic bg-gray-50 dark:bg-gray-700/50 p-2 rounded text-gray-600 dark:text-gray-300 line-clamp-3">{contact.notes}</p>}
                        </div>
                        <div className="mt-6 pt-4 border-t dark:border-gray-700 flex justify-end">
                            <button onClick={() => { if(confirm('Excluir contato?')) handleDeleteContact(contact.id); }} className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 font-semibold px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><TrashIcon /> Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HousekeepingPage: React.FC = () => {
    const { suiteStatuses, handleUpdateSuiteStatus } = useAppContext();
    
    const getStatusColor = (status: string) => {
        switch(status) {
            case 'clean': return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
            case 'dirty': return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
            case 'occupied': return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
            case 'maintenance': return 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800';
            default: return 'bg-gray-50 border-gray-200';
        }
    };
    
    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'clean': return <div className="text-green-600 dark:text-green-400"><CheckCircleIcon /></div>;
            case 'dirty': return <div className="text-red-600 dark:text-red-400"><BroomIcon /></div>;
            case 'occupied': return <div className="text-blue-600 dark:text-blue-400"><BedIcon /></div>;
            case 'maintenance': return <div className="text-amber-600 dark:text-amber-400"><WrenchScrewdriverIcon /></div>;
            default: return null;
        }
    }

    return (
        <div className="p-4 md:p-8 space-y-8">
            <PageHeader title="Governança & Housekeeping" />
            
            <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-green-500"></span> Limpo (Disponível)</div>
                <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-red-500"></span> Sujo (Limpeza)</div>
                <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Ocupado</div>
                <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Manutenção</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {suiteStatuses.map(suite => (
                    <div key={suite.id} className={`p-4 rounded-xl border-2 ${getStatusColor(suite.status)} flex flex-col justify-between h-40 transition-all shadow-sm hover:shadow-md relative overflow-hidden group`}>
                        <div className="flex justify-between items-start z-10">
                            <h3 className="font-bold text-lg dark:text-gray-100">{suite.name}</h3>
                            {getStatusIcon(suite.status)}
                        </div>
                        <div className="z-10 mt-auto">
                             <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 block">Status</label>
                             <select 
                                value={suite.status} 
                                onChange={(e) => handleUpdateSuiteStatus(suite.id, { status: e.target.value as any })}
                                className="w-full text-xs p-1.5 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-hotel-blue cursor-pointer font-semibold shadow-sm"
                             >
                                <option value="clean">Limpo</option>
                                <option value="dirty">Sujo</option>
                                <option value="occupied">Ocupado</option>
                                <option value="maintenance">Manutenção</option>
                             </select>
                        </div>
                        <div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10 z-0 ${suite.status === 'clean' ? 'bg-green-500' : suite.status === 'dirty' ? 'bg-red-500' : suite.status === 'occupied' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                    </div>
                ))}
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
// 8. LÓGICA DO APLICATIVO (App Logic Hook)
// ============================================================================

// Keys for LocalStorage
const STORAGE_KEYS = {
  RESERVATIONS: 'hotel_reservations_v2026_rev4',
  SUITES: 'hotel_suite_statuses_v2026_rev4',
  COSTS: 'hotel_costs_v2026_rev4',
  CONTACTS: 'hotel_contacts_v2026_rev4',
  THEME: 'hotel_dark_mode',
  API_URL: 'hotel_api_url',
  API_KEY: 'hotel_api_key'
};

const useAppLogic = (): AppContextType => {
    // Helper to load from storage or use default
    const loadState = <T,>(key: string, fallback: T): T => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : fallback;
        } catch (e) {
            console.error(`Error loading ${key}`, e);
            return fallback;
        }
    };

    const [isDarkMode, setIsDarkMode] = useState(() => loadState(STORAGE_KEYS.THEME, false));
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Data states
    const [reservations, setReservations] = useState<Reservation[]>(() => loadState(STORAGE_KEYS.RESERVATIONS, initialReservations));
    const [suiteStatuses, setSuiteStatuses] = useState<SuiteStatus[]>(() => loadState(STORAGE_KEYS.SUITES, initialSuiteStatuses));
    const [costs, setCosts] = useState<Cost[]>(() => loadState(STORAGE_KEYS.COSTS, initialCosts));
    const [contacts, setContacts] = useState<Contact[]>(() => loadState(STORAGE_KEYS.CONTACTS, initialContactsData));
    
    const [loggedInUser, setLoggedInUser] = useState<string | null>(() => sessionStorage.getItem('hotel_user'));
    
    // API Configuration
    const [apiBaseUrl, setApiBaseUrl] = useState(() => loadState(STORAGE_KEYS.API_URL, ''));
    const [apiKey, setApiKey] = useState(() => loadState(STORAGE_KEYS.API_KEY, ''));
    const [syncStatus, setSyncStatus] = useState<SyncStatus>('offline');

    // --- GENERIC API HANDLER ---
    const syncDataWithServer = useCallback(async () => {
        if (!apiBaseUrl) {
            setSyncStatus('offline');
            return;
        }

        setSyncStatus('syncing');
        try {
            const headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

            // Example: Parallel fetching (Simplified for this use case)
            // In a real scenario, you might want to fetch only what changed or use specific endpoints
            // This assumes endpoints: /reservations, /suites, /costs, /contacts exist on VPS
            
            // FETCHING (GET) - Simple poll strategy
            try {
                const resRes = await fetch(`${apiBaseUrl}/reservations`, { headers });
                if(resRes.ok) { const data = await resRes.json(); if(Array.isArray(data)) setReservations(data); }
                
                const resCosts = await fetch(`${apiBaseUrl}/costs`, { headers });
                if(resCosts.ok) { const data = await resCosts.json(); if(Array.isArray(data)) setCosts(data); }

                // We update local status to match remote if successful
                setSyncStatus('connected');
            } catch (e) {
                console.warn("API Fetch failed, using local data", e);
                setSyncStatus('error');
            }

        } catch (error) {
            console.error("Sync error:", error);
            setSyncStatus('error');
        }
    }, [apiBaseUrl, apiKey]);

    const pushDataToServer = async (endpoint: string, data: any) => {
        if (!apiBaseUrl) return; // Offline mode
        
        try {
            setSyncStatus('syncing');
            const headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
            
            // Assuming the API accepts full array replacement for simplicity in this MVP
            // or specific create/update endpoints. Here we try a generic "sync" POST
            await fetch(`${apiBaseUrl}/${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(data)
            });
            setSyncStatus('connected');
        } catch (e) {
            console.error(`Failed to push ${endpoint}`, e);
            setSyncStatus('error');
        }
    };

    // --- POLLING EFFECT ---
    useEffect(() => {
        if (apiBaseUrl) {
            syncDataWithServer(); // Initial sync
            const interval = setInterval(syncDataWithServer, 60000); // Poll every 60s
            return () => clearInterval(interval);
        }
    }, [apiBaseUrl, apiKey, syncDataWithServer]);


    // --- PERSISTENCE EFFECTS (LOCAL + API) ---
    // Whenever data changes, we save to local storage AND try to push to API if configured
    
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    }, [reservations]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.SUITES, JSON.stringify(suiteStatuses));
    }, [suiteStatuses]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.COSTS, JSON.stringify(costs));
    }, [costs]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
    }, [contacts]);

    // Settings persistence
    useEffect(() => localStorage.setItem(STORAGE_KEYS.API_URL, JSON.stringify(apiBaseUrl)), [apiBaseUrl]);
    useEffect(() => localStorage.setItem(STORAGE_KEYS.API_KEY, JSON.stringify(apiKey)), [apiKey]);
    useEffect(() => localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(isDarkMode)), [isDarkMode]);

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    useEffect(() => {
        if (loggedInUser) sessionStorage.setItem('hotel_user', loggedInUser);
        else sessionStorage.removeItem('hotel_user');
    }, [loggedInUser]);

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    // --- DATA EXPORT/IMPORT ---
    const handleExportData = () => {
        const data = {
            reservations,
            suiteStatuses,
            costs,
            contacts,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup-hotel-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                if(confirm('Isso substituirá todos os dados atuais pelos dados do arquivo. Deseja continuar?')) {
                    if (data.reservations) setReservations(data.reservations);
                    if (data.suiteStatuses) setSuiteStatuses(data.suiteStatuses);
                    if (data.costs) setCosts(data.costs);
                    if (data.contacts) setContacts(data.contacts);
                    alert('Dados restaurados com sucesso!');
                }
            } catch (err) {
                alert('Erro ao ler arquivo de backup. Verifique se é um JSON válido.');
                console.error(err);
            }
        };
        reader.readAsText(file);
        // Reset input
        e.target.value = '';
    };

    // --- BUSINESS LOGIC WRAPPERS ---

    const handleAddReservation = (resData: NewReservationData) => {
        const checkInDate = new Date(resData.checkIn);
        const checkOutDate = new Date(resData.checkOut);
        const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
        const numberOfNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

        const newReservation: Reservation = {
            ...resData,
            id: Date.now(),
            numberOfNights,
            amountPending: resData.totalRevenue - resData.amountPaid,
            downPayment: resData.amountPaid > 0,
        };
        const newData = [...reservations, newReservation];
        setReservations(newData);
        pushDataToServer('reservations', newData); // Trigger API push
    };

    const handleDeleteReservation = (id: number) => {
        const newData = reservations.filter(r => r.id !== id);
        setReservations(newData);
        pushDataToServer('reservations', newData);
    };

    const handleUpdateSuiteStatus = (suiteId: number, newStatusData: Partial<SuiteStatus>) => {
        const newData = suiteStatuses.map(s => s.id === suiteId ? { ...s, ...newStatusData } : s);
        setSuiteStatuses(newData);
        pushDataToServer('suites', newData);
    };

    const handleUpdateContact = (updatedContact: Contact) => {
        const newData = contacts.map(c => c.id === updatedContact.id ? updatedContact : c);
        setContacts(newData);
        pushDataToServer('contacts', newData);
    };

    const handleAddContact = (newContact: Contact) => {
        const newData = [...contacts, { ...newContact, id: Date.now() }];
        setContacts(newData);
        pushDataToServer('contacts', newData);
    };

    const handleDeleteContact = (contactId: number) => {
        const newData = contacts.filter(c => c.id !== contactId);
        setContacts(newData);
        pushDataToServer('contacts', newData);
    };

    const handleAddCost = (newCostData: Omit<Cost, 'id'>) => {
        const newData = [...costs, { ...newCostData, id: Date.now() }];
        setCosts(newData);
        pushDataToServer('costs', newData);
    };

    const handleUpdateCost = (updatedCost: Cost) => {
        const newData = costs.map(c => c.id === updatedCost.id ? updatedCost : c);
        setCosts(newData);
        pushDataToServer('costs', newData);
    };

    const handleDeleteCost = (costId: number) => {
        const newData = costs.filter(c => c.id !== costId);
        setCosts(newData);
        pushDataToServer('costs', newData);
    };

    const handleLogin = (login: string, pass: string) => {
        if ((login === 'Larissa' && pass === 'Knupp24') || (login === 'Mara' && pass === '@me19591959') || (login === 'Admin' && pass === 'admin') || (login.toLowerCase() === 'dione' && pass === '12345678')) {
            setLoggedInUser(login);
            return true;
        }
        return false;
    };

    const handleLogout = () => {
        setLoggedInUser(null);
    };

    return {
        isDarkMode, toggleDarkMode, currentView, setCurrentView, isSidebarOpen, setIsSidebarOpen,
        reservations, suiteStatuses, costs, contacts, loggedInUser,
        apiBaseUrl, setApiBaseUrl, apiKey, setApiKey,
        handleAddReservation, handleDeleteReservation, handleUpdateSuiteStatus,
        handleUpdateContact, handleAddContact, handleDeleteContact,
        handleAddCost, handleUpdateCost, handleDeleteCost,
        handleLogin, handleLogout,
        handleExportData, handleImportData,
        syncStatus, forceSync: syncDataWithServer
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
    const { isDarkMode, toggleDarkMode, currentView, setCurrentView, loggedInUser, handleLogout, isSidebarOpen, setIsSidebarOpen, syncStatus, forceSync } = useAppContext();
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
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-xs cursor-pointer" onClick={forceSync} title={syncStatus === 'connected' ? 'Sincronizado com VPS' : 'Clique para tentar reconectar'}>
                        {syncStatus === 'connected' ? <CloudIcon /> : <CloudSlashIcon />}
                        <span className="uppercase font-bold">{syncStatus === 'connected' ? 'Online' : syncStatus === 'syncing' ? 'Sync...' : 'Offline'}</span>
                    </div>
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
