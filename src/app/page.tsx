"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FloatingTicket from '@/components/user/FloatingTicket';

const HomePage: React.FC = () => {
 
  const [activeService, setActiveService] = useState(0);
  const [mounted, setMounted] = useState(false)

  // Controlar efectos de scroll
  useEffect(() => {
    
    setMounted(true);
   
  }, []);

  // Datos de servicios para facilitar mantenimiento
  const services = [
    {
      id: 1,
      title: "Muebles Personalizados",
      description: "Diseñamos y fabricamos piezas únicas para tu hogar o negocio con materiales de primera calidad.",
      image: "/home_2.webp"
    },
    {
      id: 2,
      title: "Diseño de Interiores",
      description: "Creamos ambientes exclusivos adaptados a tus necesidades y estilo de vida.",
      image: "/home_3.webp"
    },
    {
      id: 3,
      title: "Restauración y Remodelación",
      description: "Damos nueva vida a tus muebles y espacios con acabados profesionales que perduran.",
      image: "/home_4.webp"
    }
  ];

  // Datos de proyectos recientes
  const projects = [
    {
      id: 1,
      title: "Residencia Moderna",
      image: "/home_5.webp",
      category: "Residencial"
    },
    {
      id: 2,
      title: "Oficina Ejecutiva",
      image: "/home_6.webp",
      category: "Comercial"
    },
    {
      id: 3,
      title: "Espacio Comercial",
      image: "/home_7.webp",
      category: "Comercial"
    }
  ];
  if (!mounted) return null;
  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors">
      <FloatingTicket />

      {/* 🌟 Hero Section Mejorado */}
      <section className="relative w-full h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/home_1.webp"
            alt="Muebles exclusivos"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="transition-transform duration-10000 ease-in-out scale-105 animate-subtle-zoom"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex flex-col justify-center items-center text-center px-4">
          <div className="transform translate-y-0 opacity-100 transition-all duration-1000 ease-out">
            <div className="max-w-5xl px-6 py-8 rounded-lg backdrop-blur-sm bg-black/20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                Diseño & Mobiliario <span className="text-secondary">Exclusivo</span> para Espacios Únicos
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Creamos soluciones personalizadas para transformar cada rincón de tu hogar o empresa con elegancia y funcionalidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/about-us" className="btn-primary px-6 py-3 text-lg">
                  Conócenos Más
                </Link>
                <Link href="/contact-us" className="btn-secondary px-6 py-3 text-lg">
                  Consulta Gratis
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* 💼 Servicios Destacados Mejorados */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="relative inline-block">
                Nuestros Servicios
                <span className="absolute bottom-0 left-0 w-full h-1 bg-secondary transform -translate-y-2"></span>
              </span>
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Soluciones a medida para cada espacio con el sello distintivo de Sobrepoxi
            </p>
          </div>

          {/* Vista Desktop y Tablet */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="card text-center group hover:-translate-y-2 transition-all duration-300"
                onMouseEnter={() => setActiveService(index)}>
                <div className="overflow-hidden rounded-lg mb-6 relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="rounded-lg transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <span className="btn-secondary px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Ver detalles</span>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-text-secondary">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Vista Mobile con Carrousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${activeService * 100}%)` }}>
                {services.map((service) => (
                  <div key={service.id} className="w-full flex-shrink-0 px-4">
                    <div className="card text-center">
                      <div className="overflow-hidden rounded-lg mb-6">
                        <Image
                          src={service.image}
                          alt={service.title}
                          width={400}
                          height={300}
                          className="rounded-lg"
                        />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-text-secondary">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controles de Carrousel */}
              <div className="flex justify-center mt-6 gap-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${activeService === index ? 'bg-primary' : 'bg-gray-light'}`}
                    onClick={() => setActiveService(index)}
                    aria-label={`Ver servicio ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏆 Trabajos Destacados Mejorados */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="relative inline-block">
                Proyectos Recientes
                <span className="absolute bottom-0 left-0 w-full h-1 bg-secondary transform -translate-y-2"></span>
              </span>
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Explorá nuestros trabajos más recientes y dejate inspirar
            </p>
          </div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group relative rounded-xl shadow-lg">
                {/* 📌 Contenedor de Imagen Ajustado */}
                <div className="relative w-full h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                  />
                </div>

                {/* 🔹 Efecto Gradiente en Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 transition-opacity group-hover:opacity-90 pointer-events-none" />

                {/* 🔸 Información del Proyecto */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-secondary text-black text-xs font-semibold rounded-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h3>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Link href={`/projects/${project.id}`} className="inline-flex items-center text-white hover:text-secondary transition-colors">
                      Ver proyecto
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          </div>


        </div>
      </section>

      {/* 📞 Llamado a la Acción Mejorado */}
      <section className="py-16 md:py-24 bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/bg.webp"
            alt="Background pattern"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-card bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  ¿Listo para transformar tus espacios?
                </h2>
                <p className="text-lg text-text-secondary mb-8">
                  Contáctanos para iniciar tu proyecto con los mejores expertos en diseño y mobiliario. Primera consulta completamente gratis.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-primary px-6 py-3 text-lg inline-flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    Contáctanos
                  </Link>
                  <Link href="/gallery" className="btn-tertiary px-6 py-3 text-lg">
                    Ver galería
                  </Link>
                </div>
              </div>

              <div className="hidden md:block relative">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary rounded-full opacity-20 animate-pulse" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary rounded-full opacity-20 animate-pulse" />
                <div className="relative z-10 bg-card rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/contact.svg"
                    alt="Proceso de diseño"
                    width={500}
                    height={400}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎟 Call to Action - Tickets Mejorado */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                🎟 ¡Participá en nuestro sorteo exclusivo de mobiliario!
              </h2>
              <p className="text-lg mb-8 max-w-2xl">
                Solo por ₡1000 obtenés un boleto personalizado y participás en nuestro sorteo mensual. Podés ganar muebles exclusivos y asesorías de diseño.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/tickets" className="btn px-6 py-3 text-lg bg-white dark:bg-gray-800 text-primary hover:bg-gray-100 font-bold inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                  </svg>
                  Comprar Ticket
                </Link>
                <Link href="/terms" className="hover:text-gray-200 underline px-6 py-3 text-lg inline-flex items-center">
                  Ver términos y condiciones
                </Link>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="absolute inset-0 bg-yellow-400 opacity-10 rounded-lg blur-xl" />
                <div className="relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-yellow-600">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Ticket #4269</h3>
                    <div className="w-32 h-32 mx-auto mb-4 relative">
                      <div className="absolute inset-0 bg-primary rounded-full opacity-30 animate-ping" />
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                      >

                        <circle cx="100" cy="100" r="100" fill="#0078BE" />


                        <path
                          d="M20 85 C50 30, 150 30, 180 85 C160 120, 40 120, 20 85 Z"
                          fill="#38B6FF"
                          opacity="0.9"
                        />



                        <path
                          d="M20 100 C50 70, 150 70, 180 100 C160 140, 40 140, 20 100 Z"
                          fill="#005AA7"
                        />


                        <path
                          d="M20 120 C50 180, 150 180, 180 120 C160 170, 40 170, 20 120 Z"
                          fill="#003366"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-medium mb-2">Sorteo Febrero 2025</p>
                    <div className="text-sm opacity-80 mb-4">¡Participá y ganá mobiliario exclusivo!</div>
                    <div className="inline-block px-4 py-2 bg-secondary/80 rounded-lg text-black font-bold">
                      Premio: *******
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📱 Testimonios con Slider (Nuevo) */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="relative inline-block">
                Lo que dicen nuestros clientes
                <span className="absolute bottom-0 left-0 w-full h-1 bg-secondary transform -translate-y-2"></span>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial) => (
              <div key={testimonial} className="card bg-card hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    {/* <Image
                      src={`/testimonial-${testimonial}.webp`}
                      alt="Cliente"
                      width={48}
                      height={48}
                      className="rounded-full"
                    /> */}
                  </div>
                  <div>
                    <h3 className="font-bold">Cliente Satisfecho {testimonial}</h3>
                    <div className="flex text-warning">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary italic">
                  &ldquo;El trabajo que realizó Sobrepoxi en mi hogar superó todas mis expectativas. El diseño, la calidad y la atención al detalle fueron excepcionales.&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;