<template>
  <div class='flex flex-col justify-center py-6 min-h-screen bg-gray-50 sm:px-6 lg:px-8'>
    <Heading />
    <div class='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div class='px-4 py-8 bg-white shadow-xl sm:rounded-lg sm:px-10'>
        <h2 class='mt-3 mb-12 text-2xl font-bold text-center text-second-color-600'>
          {{ $t('Add new address') }}
        </h2>
        <form class='space-y-6' @submit.prevent='this.addaddress'>

          <div class='mt-1'>


            <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='newPassword'>
              {{ $t('Full Address') }}
            </label>
            <input id='address' :placeholder='$t("123 Street, City, Country")' :value='newAddress?.address' autocomplete='address'
                   class='shadow-sm focus:ring-main-color-500 focus:border-main-color-500 block w-full sm:text-sm border-gray-300 rounded-md'
                   name='address'
                   type='text'

            />

          </div>
          <div class='mt-1'>
            <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='password'>
              {{ $t('Description') }}
            </label>

            <input id='description' :placeholder='$t("My Home Address")' :value='newAddress?.description' autocomplete='description'
                   class='shadow-sm focus:ring-main-color-500 focus:border-main-color-500 block w-full sm:text-sm border-gray-300 rounded-md'
                   name='description'
                   type='text'

            />
          </div>






          <button
            class='flex justify-center px-4 py-2 w-full text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
            type='submit'>
            {{ $t('Save') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Heading from '../components/auth/heading.vue'
import SocialLogin from '../components/auth/social_login.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    SocialLogin,
    Heading,
  },
  computed: {
    ...mapState('user', {
      user: state => state.user,
    }),
  },
  methods: {
    ...mapActions('user', ['addAddressAction']),

    addaddress(event) {
      this.addAddressAction(event).then(result => {
        if (result.type === 'success') {
          console.log(this.$route.redirectedFrom)
          this.$router.replace(this.$route.redirectedFrom || { name: 'address' })
        } else {


        }
      })
    },
  },
}
</script>