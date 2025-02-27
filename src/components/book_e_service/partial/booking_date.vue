<template>
  <div class='flex'>

    <litepie-datepicker id='bookingAt'
                        ref='litepieRef'
                        v-model='dateValue'
                        :disabled-date="disabledDate"
                        :formatter="formatter"
                        :min="dateValue"
                        aria-valuemin='dateValue'
                        as-single
                        @click='litepieRef.isShow = !litepieRef.isShow'
    ></litepie-datepicker>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { createNamespacedHelpers, useStore } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('bookEService')

export default {
  name: 'BookingDate',
  setup() {
    const store = useStore()
    const dateValue = ref(store.state.bookEService.booking.booking_at)
    const litepieRef = ref(null)
    const formatter = ref({
      min:dateValue,
      minDate:dateValue,

    });
    const minDate = ref(new Date());

    watch(dateValue, (first, second) => {
      if (first instanceof Object) {
        store.dispatch('bookEService/updateBookingAtAction', first[0])
      } else {
        store.dispatch('bookEService/updateBookingAtAction', first)
      }
    })



    function disabledDate(vDate){
      if (vDate < dateValue)
      return disabled ;
    }

    return {
      dateValue,
      litepieRef,
      disabledDate
    }
  },
}
</script>