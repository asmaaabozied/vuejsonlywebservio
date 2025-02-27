<template>
  <TransitionRoot :show='this.newUser !== undefined' as='template'>
    <Dialog as='div' class='overflow-hidden fixed inset-0 z-40' @close='this.togglePasswordAction()'>
      <div class='overflow-hidden absolute inset-0'>
        <DialogOverlay class='absolute inset-0'/>
        <div class='flex fixed inset-y-0 right-0 pl-10 max-w-full sm:pl-16'>
          <TransitionChild as='template' enter='transform transition ease-in-out duration-500 sm:duration-700'
                           enter-from='translate-x-full'
                           enter-to='translate-x-0'
                           leave='transform transition ease-in-out duration-500 sm:duration-700'
                           leave-from='translate-x-0'
                           leave-to='translate-x-full'>
            <div class='w-screen max-w-2xl'>

              <div class='flex flex-col h-full bg-white shadow-xl'>

                <!-- Header -->
                <div class='px-4 py-6 bg-gray-50 sm:px-6'>
                  <div class='flex justify-between items-start space-x-3'>
                    <div class='space-y-1'>
                      <DialogTitle class='text-lg font-medium text-second-color-600'>
                        {{ $t('Change Password') }}
                      </DialogTitle>
                      <p class='text-sm text-gray-500'>
                        {{ $t('this Change Password.') }}
                      </p>
                    </div>
                    <div class='flex items-center h-7'>
                      <button class='text-gray-400 hover:text-gray-500' type='button'
                              @click='this.togglePasswordAction()'>
                        <XIcon aria-hidden='true' class='w-6 h-6'/>
                      </button>
                    </div>
                  </div>
                </div>


                <div class='px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-6'>
                  <div class='sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3'>
                    <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='password'>
                      {{ $t('Old Password') }}
                    </label>
                    <div class='mt-1 sm:mt-0 sm:col-span-2'>
                      <input id='password' :placeholder='$t("••••••••••••")' :value='newUser?.password'
                             autocomplete='name'
                             class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                             name='oldpassword'
                             required='required'
                             type='password'
                             @input='(e) => {newUser.password = e.target.value}'/>
                    </div>
                  </div>
                  <div class='sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3'>
                    <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='newPassword'>
                      {{ $t('New Password') }}
                    </label>
                    <div class='mt-1 sm:mt-0 sm:col-span-2'>
                      <input id='newPassword' :placeholder='$t("••••••••••••")'
                             autocomplete='password'
                             class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                             name='password'
                             required='required'
                             type='password'
                             @input='(e) => {newUser.password = e.target.value}'/>
                    </div>
                  </div>
                  <div class='sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3'>
                    <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='confirmPassword'>
                      {{ $t('Confirm New Password') }}
                    </label>
                    <div class='mt-1 sm:mt-0 sm:col-span-2'>
                      <input id='confirmPassword' :placeholder='$t("••••••••••••")' :value='newUser?.confirmPassword'
                             autocomplete='password'
                             class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                             name='confirmPassword'
                             required='required'
                             type='password'
                             @input='(e) => {newUser.confirmPassword = e.target.value}'/>
                    </div>
                  </div>
                </div>
                <!-- Action buttons -->
                <div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6'>
                  <div class='flex justify-between space-x-3'>

                    <button
                        class='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                        type='button'
                        @click='this.togglePasswordAction()'>
                      <ChevronLeftIcon aria-hidden='true' class='mr-2 w-5 h-5'/>
                      {{ $t('Close') }}
                    </button>
                    <button
                        class='inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                        type='button'
                        @click='this.updateProfile()'>
                      {{ $t('Save') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {Dialog, DialogOverlay, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {XIcon, ChevronLeftIcon} from '@heroicons/vue/outline'
import {mapState, mapActions, mapGetters} from 'vuex'


export default {
  name: 'Change Password',
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    XIcon,
    ChevronLeftIcon,
  },

  mounted() {

  },
  computed: {
    ...mapState('user', {
      newUser: state => state.newUser,
    }),

    ...mapGetters('user', ['getUser']),
  },
  methods: {
    ...mapActions('user', ['togglePasswordAction', 'setNewUserAction', 'updatePasswordAction']),
    ...mapActions('snackbar', ['toggleSnackBarAction']),
    updateProfile() {
      let errorsMessages = []
      if (this.newUser.password !== undefined) {
        if (this.newUser.newPassword !== this.newUser.confirmPassword) {
          errorsMessages.push(this.$i18n.t('The password confirmation does not match'))
        } else if ((this.newUser.newPassword?.length || 0) < 6) {
          errorsMessages.push(this.$i18n.t('The minimum password length is 6'))
        }
      }

      if (errorsMessages.length > 0) {
        this.toggleSnackBarAction({title: 'Validation failed', message: errorsMessages.join('<br>'), type: 'error'})
        return
      }
      this.newUser.password = this.newUser.newPassword


      this.updateUserAction(this.newUser).then((result) => {
        this.toggleSnackBarAction(result)
      })
    },


  },
}

</script>