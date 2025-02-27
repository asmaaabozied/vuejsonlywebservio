<template>

  <div v-if='addresses.length === 0'>
    <div
        class='flex flex-col justify-center py-6 min-h-screen bg-gray-50 sm:px-4 lg:px-6'>

      No Data Found
    </div>
  </div>

  <div v-else class='flex flex-col justify-center py-6 min-h-screen bg-gray-50 sm:px-4 lg:px-6'>
    {{ $t('My Addresses') }}

    <!--      <div v-for='address in addresses' :key='address.id'-->
    <!--           class='relative p-6 bg-white rounded-lg group'>-->
    <!--        <div>-->

    <!--        </div>-->
    <!--        <div class='mt-4'>-->
    <!--          <h3 class='text-lg font-bold'>-->
    <!--            {{ address.address }}-->
    <!--            <span>-->
    <!--               {{ address.description }}-->
    <!--            </span>-->
    <!--          </h3>-->
    <!--        </div>-->
    <!--      </div>-->

    <table style="border:2px solid black">

      <tbody>

      <tr>
        <th style="border:2px solid black"> {{ $t('ID') }}</th>
        <th style="border:2px solid black"> {{ $t('Address') }}</th>
        <th style="border:2px solid black"> {{ $t('Description') }}</th>
<!--        <th style="border:2px solid black"> {{ $t('Action') }}</th>-->

      </tr>

      <tr v-for='address in addresses' :key='address.id'>
        <td style="border:2px solid black">
          {{ address.id }}
        </td>
        <td style="border:2px solid black">
          {{ address.address }}
        </td>
        <td style="border:2px solid black">
          {{ address.description }}
        </td>
<!--        <td style="border:2px solid black">-->
<!--          <button class="sm:break-normal" @click='this.deletaddress(address.id)'>Delete</button>-->
<!--        </td>-->
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import Heading from '../components/auth/heading.vue'

import {createNamespacedHelpers} from 'vuex'

const {mapState, mapActions} = createNamespacedHelpers('user')


export default {

  components: {

    Heading,
  },
  mounted() {
    this.getAddressesActionAll()
  },
  computed: {

    ...mapState(['addresses']),


  },
  methods: {

    ...mapActions(['getAddressesActionAll', 'deleteAddressAction']),


    deletaddress(event) {
      console.log("events",event)
      this.deleteAddressAction(event).then(result => {
        if (result.type === 'success') {
          console.log(this.$route.redirectedFrom)
          this.$router.replace(this.$route.redirectedFrom || {name: 'address'})
        } else {


        }
      })
    },
  },

}
</script>
