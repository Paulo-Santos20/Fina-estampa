import React, { useState } from 'react';
import { FaUser, FaSave, FaEdit, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import styles from '../Dashboard.module.css';

const ProfilePage = ({ user, timeRange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Aqui você salvaria os dados
    setIsEditing(false);
    alert('Dados salvos com sucesso!');
  };

  return (
    <>
      {/* Informações Pessoais */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <FaUser className={styles.sectionIcon} />
            Informações Pessoais
          </h2>
          <button 
            className={styles.viewAllButton}
            onClick={() => setIsEditing(!isEditing)}
          >
            <FaEdit /> {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Dados Básicos */}
          <div>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'var(--wine-destaque)', 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Dados Básicos
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--preto-secundario)',
                  fontWeight: '500'
                }}>
                  Nome Completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid var(--cinza-claro)',
                      borderRadius: 'var(--radius-medium)',
                      fontSize: '0.9rem'
                    }}
                  />
                ) : (
                  <p style={{ 
                    margin: 0, 
                    padding: '0.8rem', 
                    background: 'var(--cinza-claro)', 
                    borderRadius: 'var(--radius-medium)',
                    color: 'var(--preto-secundario)'
                  }}>
                    {formData.name}
                  </p>
                )}
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--preto-secundario)',
                  fontWeight: '500'
                }}>
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid var(--cinza-claro)',
                      borderRadius: 'var(--radius-medium)',
                      fontSize: '0.9rem'
                    }}
                  />
                ) : (
                  <p style={{ 
                    margin: 0, 
                    padding: '0.8rem', 
                    background: 'var(--cinza-claro)', 
                    borderRadius: 'var(--radius-medium)',
                    color: 'var(--preto-secundario)'
                  }}>
                    {formData.email}
                  </p>
                )}
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--preto-secundario)',
                  fontWeight: '500'
                }}>
                  Telefone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid var(--cinza-claro)',
                      borderRadius: 'var(--radius-medium)',
                      fontSize: '0.9rem'
                    }}
                  />
                ) : (
                  <p style={{ 
                    margin: 0, 
                    padding: '0.8rem', 
                    background: 'var(--cinza-claro)', 
                    borderRadius: 'var(--radius-medium)',
                    color: 'var(--preto-secundario)'
                  }}>
                    {formData.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div>
            <h4 style={{ 
              margin: '0 0 1rem 0', 
              color: 'var(--wine-destaque)', 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Endereço
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--preto-secundario)',
                  fontWeight: '500'
                }}>
                  Endereço
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid var(--cinza-claro)',
                      borderRadius: 'var(--radius-medium)',
                      fontSize: '0.9rem'
                    }}
                  />
                ) : (
                  <p style={{ 
                    margin: 0, 
                    padding: '0.8rem', 
                    background: 'var(--cinza-claro)', 
                    borderRadius: 'var(--radius-medium)',
                    color: 'var(--preto-secundario)'
                  }}>
                    {formData.address}
                  </p>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: 'var(--preto-secundario)',
                    fontWeight: '500'
                  }}>
                    Cidade
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid var(--cinza-claro)',
                        borderRadius: 'var(--radius-medium)',
                        fontSize: '0.9rem'
                      }}
                    />
                  ) : (
                    <p style={{ 
                      margin: 0, 
                      padding: '0.8rem', 
                      background: 'var(--cinza-claro)', 
                      borderRadius: 'var(--radius-medium)',
                      color: 'var(--preto-secundario)'
                    }}>
                      {formData.city}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: 'var(--preto-secundario)',
                    fontWeight: '500'
                  }}>
                    Estado
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid var(--cinza-claro)',
                        borderRadius: 'var(--radius-medium)',
                        fontSize: '0.9rem'
                      }}
                    />
                  ) : (
                    <p style={{ 
                      margin: 0, 
                      padding: '0.8rem', 
                      background: 'var(--cinza-claro)', 
                      borderRadius: 'var(--radius-medium)',
                      color: 'var(--preto-secundario)'
                    }}>
                      {formData.state}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: 'var(--preto-secundario)',
                    fontWeight: '500'
                  }}>
                    CEP
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid var(--cinza-claro)',
                        borderRadius: 'var(--radius-medium)',
                        fontSize: '0.9rem'
                      }}
                    />
                  ) : (
                    <p style={{ 
                      margin: 0, 
                      padding: '0.8rem', 
                      background: 'var(--cinza-claro)', 
                      borderRadius: 'var(--radius-medium)',
                      color: 'var(--preto-secundario)'
                    }}>
                      {formData.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div style={{ 
            marginTop: '2rem', 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'flex-end' 
          }}>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: '0.8rem 1.5rem',
                background: 'var(--cinza-claro)',
                border: '2px solid var(--cinza-claro)',
                color: 'var(--preto-secundario)',
                borderRadius: 'var(--radius-medium)',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '0.8rem 1.5rem',
                background: 'var(--wine-destaque)',
                border: '2px solid var(--wine-destaque)',
                color: 'var(--white-principal)',
                borderRadius: 'var(--radius-medium)',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaSave /> Salvar Alterações
            </button>
          </div>
        )}
      </section>

      {/* Segurança */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <FaLock className={styles.sectionIcon} />
            Segurança da Conta
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div className={styles.quickActionButton} style={{ 
            padding: '1.5rem',
            textAlign: 'left',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'inherit' }}>Alterar Senha</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                Última alteração: há 30 dias
              </p>
            </div>
            <FaLock style={{ fontSize: '1.5rem' }} />
          </div>

          <div className={styles.quickActionButton} style={{ 
            padding: '1.5rem',
            textAlign: 'left',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'inherit' }}>Verificação em 2 Etapas</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                Status: Desativada
              </p>
            </div>
            <FaLock style={{ fontSize: '1.5rem' }} />
          </div>
        </div>
      </section>

      {/* Preferências */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Preferências de Comunicação
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            cursor: 'pointer',
            padding: '1rem',
            background: 'var(--cinza-claro)',
            borderRadius: 'var(--radius-medium)'
          }}>
            <input type="checkbox" defaultChecked />
            <div>
              <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--preto-secundario)' }}>
                Receber ofertas por email
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--cinza-medio)' }}>
                Receba as melhores ofertas e novidades da Fina Estampa
              </p>
            </div>
          </label>

          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            cursor: 'pointer',
            padding: '1rem',
            background: 'var(--cinza-claro)',
            borderRadius: 'var(--radius-medium)'
          }}>
            <input type="checkbox" defaultChecked />
            <div>
              <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--preto-secundario)' }}>
                Notificações de pedidos
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--cinza-medio)' }}>
                Receba atualizações sobre o status dos seus pedidos
              </p>
            </div>
          </label>

          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            cursor: 'pointer',
            padding: '1rem',
            background: 'var(--cinza-claro)',
            borderRadius: 'var(--radius-medium)'
          }}>
            <input type="checkbox" />
            <div>
              <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--preto-secundario)' }}>
                SMS promocionais
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--cinza-medio)' }}>
                Receba ofertas especiais por SMS
              </p>
            </div>
          </label>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;