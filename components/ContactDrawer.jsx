"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useState } from 'react'

const ContactDrawer = ({ isOpen, onClose }) => {
    const { t } = useLanguage()
    const [formState, setFormState] = useState({
        email: '',
        name: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrorMessage('')

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
                    ...formState
                }),
            })

            const result = await response.json()

            if (result.success) {
                setIsSuccess(true)
                setFormState({ email: '', name: '', message: '' })
            } else {
                setErrorMessage(t.contact.error)
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            setErrorMessage(t.contact.error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleClose = () => {
        onClose()
        // Reset state after a delay to allow exit animation
        setTimeout(() => {
            setIsSuccess(false)
            setErrorMessage('')
        }, 300)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black z-[100000] cursor-pointer"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-white z-[100001] shadow-2xl overflow-y-auto"
                    >
                        <div className="p-8 md:p-12 h-full flex flex-col">
                            {/* Header */}
                            <button
                                onClick={handleClose}
                                className="flex items-center gap-2 text-gray-900 font-medium hover:opacity-70 transition-opacity mb-12 w-fit"
                            >
                                <div className="bg-black text-white p-1 rounded">
                                    <ArrowLeft size={20} />
                                </div>
                                {t.contact.return}
                            </button>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                                <AnimatePresence mode="wait">
                                    {isSuccess ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="text-center flex flex-col items-center"
                                        >
                                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                                <CheckCircle size={40} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.contact.success}</h3>
                                            <p className="text-gray-500 mb-8">
                                                {t.contact.successMessage}
                                            </p>
                                            <button
                                                onClick={handleClose}
                                                className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                            >
                                                {t.contact.close}
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="mb-12">
                                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                                                    {t.contact.title}
                                                </h3>
                                                <div className="space-y-2">
                                                    <p className="text-xl text-gray-900 font-medium">robertojesusvasquez@gmail.com</p>
                                                    <p className="text-xl text-gray-900 font-medium">+54 11 3609-3041</p>
                                                </div>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="email" className="sr-only">{t.contact.emailLabel}</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        placeholder={t.contact.emailLabel}
                                                        value={formState.email}
                                                        onChange={handleChange}
                                                        required
                                                        disabled={isSubmitting}
                                                        className="w-full px-4 py-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="name" className="sr-only">{t.contact.nameLabel}</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        placeholder={t.contact.nameLabel}
                                                        value={formState.name}
                                                        onChange={handleChange}
                                                        required
                                                        disabled={isSubmitting}
                                                        className="w-full px-4 py-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="message" className="sr-only">{t.contact.messageLabel}</label>
                                                    <textarea
                                                        id="message"
                                                        name="message"
                                                        placeholder={t.contact.messageLabel}
                                                        value={formState.message}
                                                        onChange={handleChange}
                                                        required
                                                        rows={4}
                                                        disabled={isSubmitting}
                                                        className="w-full px-4 py-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-gray-900 placeholder-gray-400 resize-none disabled:bg-gray-50 disabled:text-gray-500"
                                                    />
                                                </div>

                                                {errorMessage && (
                                                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                                                        <AlertCircle size={16} />
                                                        <p>{errorMessage}</p>
                                                    </div>
                                                )}

                                                <div className="flex justify-end">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="px-8 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px] justify-center"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <Loader2 size={20} className="animate-spin" />
                                                                <span>{t.contact.sending}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>{t.contact.send}</span>
                                                                <Send size={18} />
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default ContactDrawer
