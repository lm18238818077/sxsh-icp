import { computed, reactive, ref } from 'vue'

const init = reactive({
  x: 0,
  y: 0
})

export const useXY = () => {
  const currentXY = computed(() => ({ x: init.x, y: init.y }))

  const nextXY = (x = 0, y = 0) => {
    init.x = init.x + x
    init.y = init.y + y
    return {
      x: init.x,
      y: init.y
    }
  }

  return {
    nextXY,
    currentXY
  }
}