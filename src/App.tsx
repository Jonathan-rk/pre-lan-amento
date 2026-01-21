import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Layout, 
  ShieldCheck,
  Shield,
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  MousePointer2,
  Smartphone,
  Plus,
  Minus,
  MessageSquare,
  Scissors,
  DollarSign,
  Lock,
  BarChart3,
  Star,
  Zap,
  CreditCard
} from 'lucide-react';

import styles from './App.module.css';
import { useScrollReveal } from './hooks/useScrollReveal';
import { TiltCard } from './components/TiltCard';
import { CrispChat, openCrispChat } from './components/CrispChat';
import { LeadModal } from './components/LeadModal';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCloseMenu = (targetId?: string) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 400);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      handleCloseMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  const openLeadModal = () => {
    setIsLeadModalOpen(true);
    if (isMenuOpen) handleCloseMenu();
  };

  const heroReveal = useScrollReveal(0.05);
  const stepsReveal = useScrollReveal(0.1);
  const featuresReveal = useScrollReveal(0.1);
  const experienceReveal = useScrollReveal(0.1);
  const pricingReveal = useScrollReveal(0.1);
  const faqReveal = useScrollReveal(0.1);
  const finalCtaReveal = useScrollReveal(0.1);

  const features = [
    { icon: <Calendar />, title: "Agenda Inesgotável", desc: "Um fluxo de reserva tão fluido que seus clientes vão adorar marcar horário. Menos atrito, mais faturamento para o seu negócio." },
    { icon: <MessageSquare />, title: "Fim das Interrupções", desc: "Lembretes via WhatsApp que realmente funcionam. Reduza faltas em até 80% sem precisar digitar uma única palavra." },
    { icon: <TrendingUp />, title: "Faturamento Sob Controle", desc: "Domine seus números. Dashboards intuitivos que mostram seu lucro real e ajudam você a tomar as melhores decisões para crescer." },
    { icon: <Scissors />, title: "Equipe em Sincronia", desc: "Gestão completa de especialistas. Organize sua equipe com logins e horários específicos, eliminando conflitos de agenda." },
    { icon: <Layout />, title: "Velocidade Máxima", desc: "Uma ferramenta desenhada para ser rápida. Menos tempo configurando, mais tempo atendendo seus clientes com maestria." },
    { icon: <ShieldCheck />, title: "Segurança Total", desc: "Confiança para você e seus clientes. Proteção de dados bancários e conformidade total com as normas brasileiras." }
  ];

  const faqs = [
    { q: "O Ordemo serve para o meu tipo de negócio?", a: "Sim! O Ordemo foi desenhado especificamente para Barbearias, Salões de Beleza, Esmalterias, Spas e Profissionais Autônomos que buscam profissionalismo e organização." },
    { q: "Sou autônomo, o Ordemo é para mim?", a: "Com certeza. O Ordemo é a ferramenta ideal para o autônomo que quer subir de nível. Você terá um link de agendamento profissional e controle financeiro completo." },
    { q: "Quais recursos estão previstos para o futuro?", a: "Nossa equipe está trabalhando constantemente. Em breve teremos gestão automática de comissões, suporte multi-unidades e integração direta de pagamentos." },
    { q: "Existe fidelidade nos planos?", a: "Não. Você tem total liberdade. Acreditamos na nossa entrega de valor e você pode cancelar ou alterar seu plano a qualquer momento." }
  ];

  return (
    <div className={styles.landingPage}>
      <div className={styles.meshBg} />

      {/* Navbar */}
      <nav className={`${styles.navbar} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={`${styles.container} ${styles.navContent}`}>
          <a href="#" className={styles.logo}>
            <img src="/Logo.svg" alt="Ordemo" className={styles.brandLogo} />
          </a>

          <div className={styles.navLinks}>
            <a href="#experiencia" className={styles.navLink}>Experiência</a>
            <a href="#recursos" className={styles.navLink}>Recursos</a>
            <a href="#planos" className={styles.navLink}>Planos</a>
            <div className={styles.navActions}>
              <button onClick={openLeadModal} className={`${styles.navBtn} ${styles.shineBtn}`}>
                Em Breve
              </button>
            </div>
          </div>

          <button className={styles.menuBtn} onClick={toggleMenu}>
            {isMenuOpen && !isClosing ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className={`${styles.mobileMenuOverlay} ${isClosing ? styles.isClosing : ''}`}>
            <div className={styles.mobileMenuHeader}>
              <a href="#" onClick={() => handleCloseMenu()} className={styles.logo}>
                <img src="/Logo.svg" alt="Ordemo" className={styles.brandLogo} />
              </a>
              <button className={styles.closeBtn} onClick={() => handleCloseMenu()}>
                <X size={32} />
              </button>
            </div>
            
            <div className={styles.mobileMenuContent}>
              <div className={styles.mobileLinks}>
                <a href="#experiencia" onClick={(e) => { e.preventDefault(); handleCloseMenu('experiencia'); }} className={styles.mobileMenuLink} style={{ '--delay': '0.1s' } as React.CSSProperties}>Experiência</a>
                <a href="#recursos" onClick={(e) => { e.preventDefault(); handleCloseMenu('recursos'); }} className={styles.mobileMenuLink} style={{ '--delay': '0.2s' } as React.CSSProperties}>Recursos</a>
                <a href="#planos" onClick={(e) => { e.preventDefault(); handleCloseMenu('planos'); }} className={styles.mobileMenuLink} style={{ '--delay': '0.3s' } as React.CSSProperties}>Planos</a>
              </div>
              
              <div className={styles.mobileMenuFooter} style={{ '--delay': '0.4s' } as React.CSSProperties}>
                 <button onClick={openLeadModal} className={`${styles.navBtn} ${styles.mobileCta} ${styles.shineBtn}`}>
                   Quero ser avisado!
                 </button>
                 <p className={styles.mobileMenuTagline}>Em breve disponível para você.</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className={styles.hero} ref={heroReveal.elementRef}>
        <div className={`${styles.container} ${styles.reveal} ${heroReveal.isVisible ? styles.revealed : ''}`}>
          <div className={styles.heroBadge}>
            <Sparkles size={16} /> &nbsp; Em Breve!
          </div>
          <h1 className={styles.heroTitle}>
            Domine sua Agenda, <br/> <span>Construa sua Liberdade</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A ferramenta de agendamento e gestão completa para quem cansou do papel e do caos no WhatsApp e quer crescer com organização e profissionalismo.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={openLeadModal} className={`${styles.primaryBtn} ${styles.shineBtn}`}>
              Quero ser avisado! <ArrowRight size={24} />
            </button>
            <button onClick={openCrispChat} className={styles.secondaryBtn}>
              Falar com Especialista <MessageSquare size={24} />
            </button>
          </div>

          <div className={styles.showcase}>
            <div className={styles.mainFrame}>
              <img src="/computador.png" alt="Painel Ordemo" />
            </div>
            
            <div className={`${styles.floatingCard} ${styles.cardPosTopLeft}`}>
              <div className={styles.floatIconBox} style={{ background: 'rgba(47, 191, 113, 0.15)', color: '#2FBF71', width: '42px', height: '42px', borderRadius: '12px' }}>
                 <DollarSign size={20} />
              </div>
              <div>
                 <span className={styles.cardStatLabel} style={{fontSize: '0.8rem'}}>Receita Mensal</span>
                 <div className={styles.cardStatValue} style={{fontSize: '1.1rem'}}>R$ 1.250,00</div>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.cardPosBottomRight}`}>
              <div className={styles.floatIconBox} style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#EC4899', width: '42px', height: '42px', borderRadius: '12px' }}>
                 <BarChart3 size={20} />
              </div>
              <div>
                 <span className={styles.cardStatLabel} style={{fontSize: '0.8rem'}}>Pagamentos atrasados</span>
                 <div className={styles.cardStatValue} style={{fontSize: '1.1rem'}}>R$ 650,00</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* How it Works */}
      <section className={styles.stepsSection} ref={stepsReveal.elementRef}>
        <div className={styles.container}>
          <div className={styles.centerText}>
            <span className={styles.headerTag}>Simplicidade Absoluta</span>
            <h2 className={styles.headerTitle}>Sua jornada para o próximo nível</h2>
          </div>
          <div className={`${styles.stepsGrid} ${styles.stagger} ${stepsReveal.isVisible ? styles.revealed : ''}`}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <div className={`${styles.stepIconWrapper} ${styles.stepIconAccent}`}>
                <MousePointer2 size={40} color="var(--lp-accent)" />
              </div>
              <h3 className={styles.stepTitle}>Configure seu Perfil</h3>
              <p className={styles.stepDesc}>Defina seus serviços, equipe e horários de atendimento em poucos minutos.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <div className={`${styles.stepIconWrapper} ${styles.stepIconSecondary}`}>
                <Smartphone size={40} color="var(--lp-secondary)" />
              </div>
              <h3 className={styles.stepTitle}>Compartilhe seu Link</h3>
              <p className={styles.stepDesc}>Seus clientes agendam direto do WhatsApp ou Instagram, de forma totalmente independente.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <div className={`${styles.stepIconWrapper} ${styles.stepIconAccent}`}>
                <TrendingUp size={40} color="var(--lp-accent)" />
              </div>
              <h3 className={styles.stepTitle}>Organize seu Negócio</h3>
              <p className={styles.stepDesc}>Acompanhe seu faturamento e gerencie seus clientes com total clareza e controle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experiencia" className={styles.schedulingSection} ref={experienceReveal.elementRef}>
        <div className={`${styles.container} ${styles.reveal} ${experienceReveal.isVisible ? styles.revealed : ''}`}>
          <div className={styles.flexLayout}>
            <div className={styles.textContent}>
              <span className={styles.headerTag}>Facilidade Real</span>
              <h2 className={`${styles.headerTitle} ${styles.experienceTitle}`}>Sua Agenda Trabalhando Enquanto Você Atende</h2>
              <p className={styles.experienceText}>
                Chega de interromper seus atendimentos para responder no WhatsApp. Ofereça a facilidade que seu cliente exige e recupere até 10 horas da sua semana com agendamentos automáticos.
              </p>
              <ul className={`${styles.benefitList} ${styles.experienceBenefits}`}>
                <li><CheckCircle2 color="var(--lp-accent)" size={28} /> Interface mobile ultra-veloz</li>
                <li><CheckCircle2 color="var(--lp-accent)" size={28} /> Notificações automáticas</li>
                <li><CheckCircle2 color="var(--lp-accent)" size={28} /> Confirmação de horário Instantânea</li>
              </ul>
            </div>
            <div className={styles.visualContent}>
               <div className={styles.phoneMockup}>
                  <img src="/celular.png" alt="Ordemo Client Interface" />
               </div>

               <div className={`${styles.floatCard} ${styles.floatRevenue}`}>
                 <div className={`${styles.cardIconBox} ${styles.cardIconBoxAccent}`} style={{ width: '42px', height: '42px', borderRadius: '12px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={20} />
                 </div>
                 <div>
                    <span className={styles.floatLabel}>Clientes/Mês</span>
                    <div className={styles.floatValue}>+120</div>
                 </div>
               </div>

               <div className={`${styles.floatCard} ${styles.floatAppointment}`}>
                 <div className={`${styles.cardIconBox} ${styles.cardIconBoxPrimary}`} style={{ width: '42px', height: '42px', borderRadius: '12px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp size={20} />
                 </div>
                 <div>
                    <span className={styles.floatLabel}>Disponibilidade</span>
                    <div className={styles.floatValue}>100%</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="recursos" style={{ padding: '8rem 0' }} ref={featuresReveal.elementRef}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
            <span className={styles.headerTag}>Poder de Execução</span>
            <h2 className={styles.headerTitle}>Infraestrutura para Crescer</h2>
          </div>
          <div className={`${styles.featureGrid} ${styles.stagger} ${featuresReveal.isVisible ? styles.revealed : ''}`}>
            {features.map((f, i) => (
              <div key={i} className={styles.tiltWrapper}>
                <TiltCard className={styles.featureCard}>
                   <div className={styles.iconBox}>{f.icon}</div>
                   <h3 className={styles.featureTitle}>{f.title}</h3>
                   <p className={styles.featureDesc}>{f.desc}</p>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trial Promo Section */}
      <section className={styles.trialPromoSection}>
        <div className={styles.container}>
          <div className={styles.trialCard}>
            <div className={styles.trialInfo}>
              <div className={styles.trialBadge}>EM BREVE</div>
              <h2 className={styles.trialTitle}>
                Cansou do caos na sua agenda? <span>Recupere o controle em breve.</span>
              </h2>
              <p className={styles.trialSubtitle}>
                Agendamento automático, controle financeiro e lembretes via WhatsApp. Cadastre-se para ser avisado quando o sistema for liberado.
              </p>
              <div className={styles.trialBenefits}>
                <div className={styles.trialBenefit}>
                  <Zap size={20} /> <span>Configuração instantânea</span>
                </div>
                <div className={styles.trialBenefit}>
                  <ShieldCheck size={20} /> <span>Sem fidelidade</span>
                </div>
                <div className={styles.trialBenefit}>
                  <CreditCard size={20} /> <span><strong>Não</strong> pede cartão</span>
                </div>
              </div>
              <button onClick={openLeadModal} className={`${styles.primaryBtn} ${styles.shineBtn} ${styles.trialBtn}`}>
                Quero ser avisado! <ArrowRight size={20} />
              </button>
            </div>
            <div className={styles.trialVisual}>
               <div className={styles.daysBadge}>
                 <span className={styles.daysNumber}>EM</span>
                 <span className={styles.daysText}>BREVE</span>
                 <div className={styles.daysGlow} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planos" className={styles.pricingSection} ref={pricingReveal.elementRef}>
        <div className={`${styles.container} ${styles.reveal} ${pricingReveal.isVisible ? styles.revealed : ''}`}>
          <div className={`${styles.pricingHeader} ${styles.reveal} ${pricingReveal.isVisible ? styles.revealed : ''}`}>
            <h2 className={styles.headerTitle}>Investimento em Organização</h2>
          </div>
          <div className={`${styles.pricingGrid} ${styles.stagger} ${pricingReveal.isVisible ? styles.revealed : ''}`}>
            <div className={`${styles.priceCard} ${styles.featuredPrice} ${styles.featuredPriceContainer}`}>
              <div className={styles.premiumCardLayout}>
                <div className={styles.premiumCardLeft}>
                  <div className={styles.pricingHeaderRow}>
                      <div>
                        <h3 className={styles.pricingCardTitle}>Plano Pro</h3>
                        <span className={styles.planBadge}>TUDO INCLUÍDO</span>
                      </div>
                      <div className={styles.planIconBox}>
                        <Star size={24} fill="currentColor" />
                      </div>
                  </div>
                  
                  <div className={styles.priceContainer}>
                    <div className={styles.priceValue}>
                      <span className={styles.amount} style={{ fontSize: '3.5rem' }}>R$ 69,90</span>
                      <span className={styles.period} style={{ fontSize: '1.2rem', opacity: 0.8 }}>/mês</span>
                    </div>
                  </div>

                  <p className={styles.pricingCardDesc}>
                    Cobrança automática via Cartão. Cancele quando quiser.
                  </p>

                  <div className={styles.mobileOnlyList} style={{ margin: '2rem 0' }}>
                    <ul className={styles.pricingBenefits}>
                      {[
                        'Agenda Inteligente & Ilimitada',
                        'Financeiro Completo com Relatórios',
                        'Lembretes via WhatsApp',
                        'Link de Agendamento Personalizado'
                      ].map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.05rem', fontWeight: 500, color: 'var(--lp-text)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--lp-accent)', color: 'white', flexShrink: 0 }}>
                            <CheckCircle2 size={14} strokeWidth={4} />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button onClick={openLeadModal} className={`${styles.priceBtn} ${styles.priceBtnPrimary} ${styles.shineBtn} ${styles.pricingCardBtn}`}>
                    Quero ser avisado!
                  </button>
                  <p className={styles.trustCopy} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lock size={12} /> Lançamento em breve
                  </p>
                </div>
                <div className={styles.premiumCardDivider} />
                <div className={styles.premiumCardRight}>
                  <ul className={`${styles.benefitList} ${styles.pricingBenefits} ${styles.desktopOnlyList}`}>
                    {[
                      'Agenda Inteligente & Ilimitada',
                      'Financeiro Completo com Relatórios',
                      'Lembretes via WhatsApp',
                      'Link de Agendamento Personalizado',
                      'Gestão de Equipe & Especialistas',
                      'Suporte Prioritário Via WhatsApp'
                    ].map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.05rem', fontWeight: 500, color: 'var(--lp-text)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--lp-accent)', color: 'white', flexShrink: 0 }}>
                          <CheckCircle2 size={14} strokeWidth={4} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={styles.faq} ref={faqReveal.elementRef}>
        <div className={styles.container}>
          <div className={`${styles.faqHeaderContainer} ${styles.reveal} ${faqReveal.isVisible ? styles.revealed : ''}`}>
            <span className={styles.headerTag}>Transparência</span>
            <h2 className={styles.headerTitle}>Perguntas Frequentes</h2>
          </div>
          <div className={`${styles.faqGrid} ${styles.stagger} ${faqReveal.isVisible ? styles.revealed : ''}`}>
            {faqs.map((f, i) => (
              <div key={i} className={styles.faqItem}>
                <div className={styles.faqHeader} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  {activeFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
                {activeFaq === i && (
                   <div className={styles.faqContent}>
                      {f.a}
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta} ref={finalCtaReveal.elementRef}>
        <div className={`${styles.container} ${styles.reveal} ${finalCtaReveal.isVisible ? styles.revealed : ''}`}>
          <h2 className={styles.finalCtaTitle}>Sua empresa pronta<br/>para o próximo nível.</h2>
          <p className={styles.finalCtaSubtitle}>Junte-se a especialistas que já entendem que organização é a base para o crescimento exponencial.</p>
          <button onClick={openLeadModal} className={`${styles.primaryBtn} ${styles.shineBtn} ${styles.finalCtaBtn}`}>
            Quero ser avisado! <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerCol}>
               <a href="#" className={styles.logoFooter}>
                  <img src="/Logo P.svg" alt="Ordemo" className={styles.brandLogoFooter} />
               </a>
               <p className={styles.footerTagline}>Onde a excelência operacional encontra o design moderno. Simplificando a gestão de quem faz o Brasil crescer.</p>
            </div>
            <div className={styles.footerCol}>
              <h4>Plataforma</h4>
              <ul className={styles.footerList}>
                <li><a href="#experiencia">Experiência</a></li>
                <li><a href="#recursos">Recursos</a></li>
                <li><a href="#planos">Planos</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Institucional</h4>
              <ul className={styles.footerList}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openCrispChat(); }}>Central de Ajuda</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
               <h4>Segurança</h4>
               <div className={styles.securityMinimalist}>
                 <div className={styles.secItem}>
                   <Shield size={18} /> <span>Dados Criptografados</span>
                 </div>
                 <div className={styles.secItem}>
                   <Lock size={18} /> <span>Ambiente Seguro</span>
                 </div>
                 <div className={styles.secItem}>
                   <ShieldCheck size={18} /> <span>Aprovado</span>
                 </div>
               </div>
            </div>
          </div>
          <div className={styles.footerBottom}>Ordemo Dynamics — Excelência em Agendamento Profissional © {new Date().getFullYear()}</div>
        </div>
      </footer>

      {/* Crisp Chat */}
      <CrispChat websiteId="44c35792-f143-40e2-aea5-39e359f59187" />

      {/* Lead Modal */}
      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
    </div>
  );
}
