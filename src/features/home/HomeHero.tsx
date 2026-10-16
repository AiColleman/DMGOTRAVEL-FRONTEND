import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, CalendarDays, MapPin, Search, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { images } from "@/mocks/data";
import { DESTINATIONS } from "@/services/catalogService";
import { todayInPeru } from "@/lib/travel-search";
import type { Destination } from "@/types";

export function HomeHero() {
  const navigate = useNavigate();
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [viajeros, setViajeros] = useState(2);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    void navigate({
      to: "/tours",
      search: {
        destino: (destino || undefined) as Destination | undefined,
        fecha: fecha || undefined,
        viajeros,
      },
    });
  };
  return (
    <section className="journey-hero" aria-labelledby="hero-title">
      <div className="container-page">
        <div className="hero-grid">
          <div className="hero-story">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-px w-8 bg-current" /> Ayacucho, Perú · Viaja con sentido
            </p>
            <h1 id="hero-title">
              Hay lugares que
              <br />
              se quedan <em>en ti.</em>
            </h1>
            <p className="hero-description">
              Encuentra tu próxima historia entre paisajes turquesa, pueblos artesanos y el corazón
              de los Andes.
            </p>
            <Link to="/tours" className="editorial-link">
              Descubre nuestras experiencias <ArrowUpRight size={19} />
            </Link>
            <div className="hero-footnote">
              <span className="hero-seal" aria-hidden>
                13°
                <br />
                <small>SUR</small>
              </span>
              <p>
                Un viaje a lo nuestro.
                <br />
                <span>Una forma distinta de conocer Ayacucho.</span>
              </p>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src={images.millpu}
              alt="Pozas de agua turquesa entre las paredes rocosas de Millpu, Ayacucho"
              width={1100}
              height={1300}
              fetchPriority="high"
              className="hero-photo"
            />
            <div className="hero-photo-shade" />
            <span className="hero-photo-index">01 / TERRITORIO AYACUCHANO</span>
            <div className="hero-photo-caption">
              <div>
                <span>LA NATURALEZA A SU RITMO</span>
                <p>
                  Aguas turquesa
                  <br />
                  de Millpu
                </p>
              </div>
              <Link
                to="/tours/$id"
                params={{ id: "millpu-turquesa" }}
                className="photo-arrow"
                aria-label="Descubrir la experiencia de Millpu"
              >
                <ArrowUpRight />
              </Link>
            </div>
            <div className="hero-location">
              <MapPin size={13} /> Circamarca · Ayacucho
            </div>
          </div>
        </div>
        <form className="journey-search" onSubmit={submit} aria-label="Buscar experiencias">
          <label>
            <MapPin />
            <span>
              <span className="search-label">¿A dónde vamos?</span>
              <select value={destino} onChange={(e) => setDestino(e.target.value)}>
                <option value="">Todos los destinos</option>
                {DESTINATIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </span>
          </label>
          <label>
            <CalendarDays />
            <span>
              <span className="search-label">Fecha de salida</span>
              <input
                type="date"
                min={todayInPeru()}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </span>
          </label>
          <label>
            <Users />
            <span>
              <span className="search-label">Viajeros</span>
              <select value={viajeros} onChange={(e) => setViajeros(Number(e.target.value))}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? "persona" : "personas"}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <button type="submit">
            <Search size={18} /> Encontrar mi viaje
          </button>
        </form>
        <div className="hero-bottom">
          <p>Viajes con identidad · Tours y alojamiento opcional</p>
          <a href="#experiencias">
            Sigue explorando <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
