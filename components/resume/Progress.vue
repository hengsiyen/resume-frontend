<template>
  <div class="rf-progress">
    <div class="rfp-item">
      <div class="rfp-content">
        <div class="rfp-left">
          <div class="percentage" :class="progressColor">
            {{ progress }}%
          </div>
          Profile completeness
        </div>
        <div class="rfp-right">
          <div class="rtpr-text d-none d-md-block">
            <div class="rfpr-text-enter">
              <div class="percentage green">
                10%
              </div>
              Add profile summary
            </div>
          </div>
          <div class="rtpr-tip rtpr-tip-green">
            <i class="fas fa-question-circle" />
          </div>
        </div>
      </div>
      <div class="rfp-content-bar">
        <div class="bar" :class="'bar-' + progressColor" :style="`width: ${progress}%;`" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  data () {
    return {
      progress: 30
    }
  },
  computed: {
    progressColor () {
      if (this.progress === 0 && this.progress < 30) {
        return 'red'
      } else if (this.progress >= 30 && this.progress < 59) {
        return 'yellow'
      } else if (this.progress >= 60 && this.progress <= 100) {
        return 'green'
      } else {
        return 'default'
      }
    }
  }
}
</script>

<style scoped>

</style>
