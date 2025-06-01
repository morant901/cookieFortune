import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'fortune_cookie__container',
  'fortune_cookie__card',
  'fortune_cookie__button',
  'fortune_cookie__phrase',
  'fortune_cookie__lucky',
  'fortune_cookie__spinner',
  'fortune_cookie__error',
]

interface FortuneCookieProps {
  buttonLabel?: string
  loadingLabel?: string
  showLuckyNumber?: boolean
}

const getLuckyNumber = () => {
  const pad = (n: number, len = 2) => n.toString().padStart(len, '0')

  return `${pad(Math.floor(Math.random() * 100))}-${pad(
    Math.floor(Math.random() * 100)
  )}-${pad(Math.floor(Math.random() * 10000), 4)}`
}

const FortuneCookie = ({
  buttonLabel = 'Obtener fortuna',
  loadingLabel = 'Obteniendo...',
  showLuckyNumber = true,
}: FortuneCookieProps) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [fortune, setFortune] = useState<string | null>(null)
  const [lucky, setLucky] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        '/api/dataentities/CF/search?_fields=CookieFortune&_schema=CF&_size=100'
      )

      if (!response.ok) {
        throw new Error('No se pudo obtener la fortuna')
      }

      const data = await response.json()

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No hay frases disponibles')
      }

      const random = data[Math.floor(Math.random() * data.length)].CookieFortune

      setFortune(random)
      setLucky(getLuckyNumber())
    } catch (err) {
      setError((err as any).message || 'Error desconocido')
    }

    setLoading(false)
  }

  return (
    <div className={handles.fortune_cookie__container}>
      <div className={handles.fortune_cookie__card}>
        <button
          className={handles.fortune_cookie__button}
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? loadingLabel : buttonLabel}
        </button>
        {loading && (
          <div className={handles.fortune_cookie__spinner}>
            <div className="fortune-cookie__spinner-circle" />
          </div>
        )}
        {error && <div className={handles.fortune_cookie__error}>{error}</div>}
        {fortune && (
          <h3 className={handles.fortune_cookie__phrase}>{fortune}</h3>
        )}
        {lucky && showLuckyNumber && (
          <h5 className={handles.fortune_cookie__lucky}>
            Números de la suerte: {lucky}
          </h5>
        )}
      </div>
    </div>
  )
}

export default FortuneCookie

FortuneCookie.schema = {
  title: 'Galleta de la Fortuna',
  description:
    'Componente que muestra una frase aleatoria y números de la suerte.',
  props: {
    buttonLabel: {
      type: 'string',
      title: 'Texto del botón',
      default: 'Obtener fortuna',
    },
    loadingLabel: {
      type: 'string',
      title: 'Texto de carga',
      default: 'Obteniendo...',
    },
    showLuckyNumber: {
      type: 'boolean',
      title: 'Mostrar número de la suerte',
      default: true,
    },
  },
}
