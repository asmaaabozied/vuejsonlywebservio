<template>
  <div class='flex flex-col justify-center py-6 min-h-screen bg-gray-50 sm:px-6 lg:px-8'>
    <Heading />
    <div class='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div class='px-4 py-8 bg-white shadow-xl sm:rounded-lg sm:px-10'>
        <h2 class='mt-3 mb-12 text-2xl font-bold text-center text-second-color-600'>
          {{ $t('Change Password') }}
        </h2>
        <form class='space-y-6' @submit.prevent='this.changepassword'>
          <div class='mt-1'>
            <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='password'>
              {{ $t('Old Password') }}
            </label>
            <input id='oldpassword' :placeholder='$t("••••••••••••")'
                   autocomplete='name'
                   class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                   name='oldpassword'
                   required='required'
                   type='password'
                   @input='(e) => {user.oldpassword = e.target.value}'/>
          </div>



          <div class='mt-1'>


            <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='newPassword'>
              {{ $t('New Password') }}
            </label>
              <input id='newPassword' :placeholder='$t("••••••••••••")'
                     autocomplete='password'
                     class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                     name='password'
                     required='required'
                     type='password'
                     @input='(e) => {user.password = e.target.value}'/>

          </div>
          <div class='mt-1'>
          <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='confirmPassword'>
            {{ $t('Confirm New Password') }}
          </label>

            <input id='confirmPassword' :placeholder='$t("••••••••••••")' :value='user?.confirmPassword'
                   autocomplete='password'
                   class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                   name='confirmPassword'
                   required='required'
                   type='password'
                   @input='(e) => {user.confirmPassword = e.target.value}'/>



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
    ...mapActions('user', ['updatePasswordAction']),
    ...mapActions('snackbar', ['toggleSnackBarAction']),

    changepassword(event) {
      this.updatePasswordAction(event).then(result => {
        if (result.type === 'success') {
          console.log(this.$route.redirectedFrom)
          this.$router.replace(this.$route.redirectedFrom || { name: 'Home' })
        } else {
          this.toggleSnackBarAction(result)
        }
      })
    },
  },
}
</script>