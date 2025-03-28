"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useCart } from "@/components/context/CartContext";
import Link from "next/link";
import { Database } from '@/types-db';
import { Toaster, toast } from 'sonner';
import { useTranslations } from "next-intl";

type TypeTicket = Database['ticket_types'];
type UsertTicket = Database['user_tickets'];

// interface Ticket {
//   id: number;
//   premio: string;
//   min_number: number;
//   max_number: number;
//   number: number;
//   serie: number;
//   min_serie: number;
//   max_serie: number;

//   date: string;
//   time: string;
//   costo: number;
//   image_url?: string;
// }



let counterId = 1;

export default function TicketTypesPageClient({
  ticketTypes,
}: {
  ticketTypes: TypeTicket[]
}) {
  const t = useTranslations("verpoxicards");
  const p = useTranslations("poxicard");

  const { cart, addToCart } = useCart();
  const cartCount = cart.length;
  
  const addUserCart = (ticket: TypeTicket) => {
    //crea un nuevo user ticket
    const newUserTicket: UsertTicket = {
      id : ticket.id,
      local_id: counterId,
      name: ticket.premio, // Nombre del ticket
      ticket_type_id: null,
      user_id: null,
      number: null,
      serie: null,
      premio: ticket.premio,
      costo: ticket.costo,
      is_locked: false,
      purchase_date: null,
      custom_design: null,
      order_id: null,
      image_url: ticket.image_url, // opcional
      min_serie: ticket.min_serie,
      max_serie: ticket.max_serie,
      min_number: ticket.min_number,
      max_number: ticket.max_number,
      date: ticket.date,
      time: ticket.time,
    };
    counterId += 1;
    addToCart(newUserTicket);

    //mensaje muy sitil de confirmación
    toast.success('Poxicard agregado al carrito', {
      duration: 1500,
      position: 'top-center',
    });
  }


  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-0">
      {/* Encabezado y carrito */}
      <Toaster richColors />
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>

        {/* Botón Carrito */}
        <Link
          className="flex items-center  gap-2 bg-yellow-400 text-gray-800 px-4 py-2 rounded-md font-bold shadow hover:shadow-lg transition"
          href="/poxicards/checkout"
        >
          <span className="text-xl">🛒</span>
          <span>{t("cart")} ({cartCount})</span>
        </Link>
      </header>

      {/* Grilla de Tickets */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ticketTypes.map((ticket) => (
          <div
            key={ticket.id}
            className="relative overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Badge de marca */}
            <div className="absolute top-2 left-2 z-10 bg-indigo-600 bg-opacity-90 text-white px-3 py-1 rounded-md text-xs font-semibold backdrop-blur-md">
              Sobrepoxi
            </div>

            {/* Imagen del premio */}
            <div className="relative w-full h-40 rounded-md overflow-hidden">
              {ticket.image_url ? (
                <Image
                  src={ticket.image_url}
                  alt={ticket.premio}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  📷 {p("noimage")}
                </div>
              )}
            </div>

            {/* Contenido de la tarjeta */}
            <div className="mt-4 space-y-2">
              {/* 1) Título/Premio */}
              <h2 className="text-lg md:text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {ticket.premio}
              </h2>

              {/* 2) Fila con Número y Serie (2 columnas en pantallas medianas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                <div>
                  <span className="font-semibold">{p("number")}: </span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {ticket.min_number} - {ticket.max_number}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Serie: </span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                  {ticket.min_serie} - {ticket.max_serie}
                  </span>
                </div>
              </div>

              {/* 3) Fila con Fecha y Hora (2 columnas en pantallas medianas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                <div>
                  <span className="font-semibold">{p("date")}: </span>
                  <span>{new Date(`${ticket.date}T${ticket.time}`).toLocaleDateString('es-CR', {
      timeZone: 'America/Costa_Rica',
    })}</span>
                </div>
                <div>
                  <span className="font-semibold">{p("time")}: </span>
                  <span>{new Date(`${ticket.date}T${ticket.time}`).toLocaleTimeString('es-CR', {
      timeZone: 'America/Costa_Rica',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // fuerza AM/PM
    })}</span>
                </div>
              </div>

              {/* 4) Fila con precio a la izquierda y QR a la derecha (centrados) */}
              <div className="flex flex-col sm:flex-row  justify-between mt-3">
                {/* Contenedor del Precio */}
                <div className="flex-1 flex justify-start items-start">
                  <p className="text-base md:text-lg font-semibold text-green-600 dark:text-green-400">
                    ₡{ticket.costo}
                  </p>
                </div>

                {/* Contenedor del QR */}
                <div className="mt-3 sm:mt-0 flex-1 flex justify-center items-center">
                  <QRCodeSVG value="https://example.com/ticket" size={40} />
                  <Image
                                src="/logo.svg"
                                alt="Sobrepoxi"
                                width={80}
                                height={80}
                                className="w-15 h-15 pl-0 ml-0"
                              />
                </div>
              </div>

            </div>

            {/* Botones */}
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href={`/poxicards/${ticket.id}`}
                className="block w-full text-center font-semibold text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md transition hover:bg-indigo-600 hover:text-white"
              >
                {p("viewdetails")}
              </Link>

              <button
                onClick={() => addUserCart(ticket)}
                className="w-full inline-flex items-center justify-center font-semibold text-white bg-indigo-600 px-4 py-2 rounded-md transition hover:bg-indigo-500"
              >
                {p("addtocart")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
