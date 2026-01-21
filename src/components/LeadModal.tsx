import React, { useState } from 'react';
import { X, Construction, CheckCircle2, Send } from 'lucide-react';
import styles from './LeadModal.module.css';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      newErrors.phone = 'Telefone inválido (10 ou 11 dígitos)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.replace(/\D/g, ''),
          email: formData.email.trim().toLowerCase(),
        }),
      });

      if (!response.ok) throw new Error('Erro ao enviar');

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', phone: '', email: '' });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Fechar">
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className={styles.successContent}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={40} />
            </div>
            <h2 className={styles.successTitle}>Cadastro Realizado!</h2>
            <p className={styles.successText}>
              Obrigado pelo interesse! Você será notificado assim que o sistema for liberado.
            </p>
            <button className={styles.closeModalBtn} onClick={handleClose}>
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className={styles.badge}>
              <Construction size={16} />
              Em Produção
            </div>

            <h2 className={styles.title}>Estamos quase lá!</h2>
            <p className={styles.subtitle}>
              O sistema está em produção e em breve será liberado. Cadastre-se para ser avisado em primeira mão!
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nome completo</label>
                <input
                  type="text"
                  className={`${styles.input} ${errors.name ? styles.error : ''}`}
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  autoComplete="name"
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>WhatsApp / Telefone</label>
                <input
                  type="tel"
                  className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  autoComplete="tel"
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>E-mail</label>
                <input
                  type="email"
                  className={`${styles.input} ${errors.email ? styles.error : ''}`}
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  autoComplete="email"
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className={styles.spinner} />
                ) : (
                  <>
                    Quero ser avisado <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadModal;
