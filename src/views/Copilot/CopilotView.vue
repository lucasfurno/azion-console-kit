<script setup>
  import ContentBlock from '@/templates/content-block'
  import AzionAiChatFullSizeBlock from '@/modules/azion-ai-chat/azion-ai-chat-full-size-block.vue'
  import PrimeButton from 'primevue/button'
  import { ref, computed } from 'vue'
  import InlineMessage from 'primevue/inlinemessage'
  import { useHelpCenterStore } from '@/stores/help-center'

  const azionAiChat = ref(null)
  const helpCenterStore = useHelpCenterStore()

  const helpCenterIsOpen = computed(() => {
    return helpCenterStore.isOpen
  })

  const customStyleRightPosition = computed(() => {
    return helpCenterIsOpen.value ? 'right-[596px]' : 'right-24'
  })

  const handleClearChat = () => {
    azionAiChat?.value.handleClearChat()
  }
</script>

<template>
  <ContentBlock>
    <template #content>
      <div :class="['fixed z-10  bottom-[137px] max-sm:right-[72px]', customStyleRightPosition]">
        <PrimeButton
          text
          v-tooltip.top="{ value: 'Start a new chat', showDelay: 200 }"
          icon="pi pi-pen-to-square"
          @click="handleClearChat"
        />
      </div>
      <AzionAiChatFullSizeBlock ref="azionAiChat" />

      <InlineMessage
        class="w-fit mt-4"
        severity="info"
        >Copilot is in experimental mode and can give you some wrong answers. Please, always
        validate your answers.
      </InlineMessage>
    </template>
  </ContentBlock>
</template>
