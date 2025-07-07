export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
  data: ContactFormData
}

export interface ApiResponse {
  success: boolean
  message: string
}

export interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}
