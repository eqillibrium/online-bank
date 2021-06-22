import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {computed, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm () {
    const store = useStore()
    const router = useRouter()
    const passwordLength = 6
    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Поле обязательно к заполнению')
            .email('Необходимо ввести email')
    )

    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .required('Поле обязательно к заполнению')
            .trim()
            .length(passwordLength, `длина пароля не может быть меньше ${passwordLength} символов`)
    )

    const onSubmit = handleSubmit(async (values) => {
        try {
            await store.dispatch('auth/login', values)
            await router.push('/')
        } catch (e) {console.log(e)}
    })

    const isTooManyAttempts = computed(() => submitCount.value >=3)

    watch(isTooManyAttempts, value => {
        if(value) {
            setTimeout(() => submitCount.value = 0, 1560)
        }
    })

    return {
        email,
        eError,
        eBlur,
        password,
        pError,
        pBlur,
        handleSubmit,
        isSubmitting,
        onSubmit,
        isTooManyAttempts
    }
}