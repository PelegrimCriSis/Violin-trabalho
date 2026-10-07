import React from 'react'
import { useState } from 'react'

function App() {
  const [ideas, setIdeas] = useState([])

  const [newIdea, setNewIdea] = useState('')

  const [error, setError] = useState('')

  function handleAddIdea(event) {
    event.preventDefault()

    const text = newIdea.trim()

    if (!text) {
      setError('Digite sua ideia antes de adicionar.')
      return
    }

    const idea = {
      id: Date.now(),
      text: text,
      done: false,
    }

    setIdeas((currentIdeas) => [...currentIdeas, idea])
    setNewIdea('')
    setError('')
  }

  function handleToggleIdea(id) {
    setIdeas((currentIdeas) =>
      currentIdeas.map((idea) =>
        idea.id === id
          ? { ...idea, done: !idea.done }
          : idea
      )
    )
  }

  function handleRemoveIdea(id) {
    setIdeas((currentIdeas) =>
      currentIdeas.filter((idea) => idea.id !== id)
    )
  }

  const completedIdeas = ideas.filter((idea) => idea.done).length

  return (
    <main className="app">
      <section className="panel">
        <header className="panel-header">
          <p className="eyebrow">REACT • TRABALHO 01</p>
          <h1>Painel de Ideias</h1>
          <p className="description">
            Registre suas ideias, marque as concluídas e remova as que não
            fazem mais sentido.
          </p>
        </header>

        <form className="idea-form" onSubmit={handleAddIdea}>
          <label htmlFor="idea-input">Nova ideia</label>

          <div className="form-row">
            <input
              id="idea-input"
              type="text"
              placeholder="Digite uma ideia de projeto..."
              value={newIdea}
              onChange={(event) => {
                setNewIdea(event.target.value)
                setError('')
              }}
            />

            <button type="submit">Adicionar</button>
          </div>

          {error && <p className="error">{error}</p>}
        </form>

        <section className="ideas-section">
          <div className="section-title">
            <h2>Minhas ideias</h2>
            <span>{ideas.length}</span>
          </div>

          {ideas.length === 0 ? (
            <p className="empty-message">
              Nenhuma ideia ainda. Adicione a primeira!
            </p>
          ) : (
            <ul className="idea-list">
              {ideas.map((idea) => (
                <li className="idea-item" key={idea.id}>
                  <label className="idea-content">
                    <input
                      type="checkbox"
                      checked={idea.done}
                      onChange={() => handleToggleIdea(idea.id)}
                    />

                    <span className={idea.done ? 'done' : ''}>
                      {idea.text}
                    </span>
                  </label>

                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => handleRemoveIdea(idea.id)}
                    aria-label={`Remover ideia: ${idea.text}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer className="panel-footer">
          {`${ideas.length} ideias no painel · ${completedIdeas} concluídas`}
        </footer>
      </section>
    </main>
  )
}

export default App
