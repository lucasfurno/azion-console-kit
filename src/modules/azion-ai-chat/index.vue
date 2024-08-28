<template>
  <div :style="{ 'background-color': 'var(--surface-section)' }">
    <div
      class="h-full flex justify-between flex-col"
      :key="renderCount"
    >
      <AzionAiChat ref="azionAiChatRef" />
    </div>
    <Sidebar
      :visible="isChatAiOpen"
      position="bottom"
      headerContent="Copilot"
      :show-close-icon="false"
      :pt="{
        root: { class: '!h-[100%] md:hidden flex' },
        headerContent: { class: 'w-full' },
        mask: { class: 'md:hidden flex' },
        content: { class: '!p-0' }
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="flex items-center gap-2">
            Copilot
            <PrimeTag
              class="ml-2"
              value="Experimental"
              v-tooltip.bottom="
                'Copilot is in experimental mode and can give you some wrong answers. Please, always validate your answers.'
              "
              severity="info"
            />
          </h2>
          <div class="gap-4 flex">
            <PrimeButton
              icon="pi pi-window-maximize"
              outlined
              class="surface-border h-8 w-8"
              aria-label="Open Copilot in a new tab"
              v-tooltip.bottom="'Open Copilot in a new tab'"
              @click="openChatInNewTab"
            />
            <PrimeButton
              icon="pi pi-pen-to-square"
              outlined
              class="surface-border h-8 w-8"
              aria-label="New Chat"
              v-tooltip.bottom="'New Chat'"
              @click="handleClearChat"
            />
            <PrimeButton
              icon="pi pi-times"
              @click="azionAiChatStore.close()"
              size="small"
              class="flex-none surface-border text-sm w-8 h-8"
              text
            />
          </div>
        </div>
      </template>

      <div class="h-full w-full justify-between flex flex-col">
        <AzionAiChat
          :key="renderCount"
          ref="azionAiChatMobileRef"
        />
      </div>
    </Sidebar>
  </div>
</template>

<script setup>
  import PrimeTag from 'primevue/tag'
  import Sidebar from 'primevue/sidebar'
  import PrimeButton from 'primevue/button'
  import AzionAiChat from './azion-ai-chat-block.vue'
  import { useHelpCenterStore } from '@/stores/help-center'
  import { updateSessionId } from './services/make-session-id'
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import hljs from 'highlight.js'
  import { AZION_MESSAGE_TYPE } from '@modules/azion-ai-chat/directives/custom-ai-prompt'
  import { useRouter } from 'vue-router'
  import { windowOpen } from '@/helpers'

  defineOptions({
    name: 'azion-ai-chat-root-block'
  })
  const azionAiChatRef = ref(null)
  const azionAiChatMobileRef = ref(null)
  const renderCount = ref(1)
  const router = useRouter()
  onMounted(() => {
    window.addEventListener('message', aiCustomPromptListenerHandler)
    addSupportToHljs()
  })

  onUnmounted(() => {
    window.removeEventListener('message', aiCustomPromptListenerHandler)
  })

  const helpCenterStore = useHelpCenterStore()
  const isChatAiOpen = computed(() => {
    return helpCenterStore.isOpen
  })

  const addSupportToHljs = () => {
    if (!window.hljs) {
      window.hljs = hljs
    }
  }

  const updateChatRenderInstance = () => {
    renderCount.value += 1
  }

  const handleClearChat = () => {
    azionAiChatRef?.value.deepChatRef.clearMessages()
    azionAiChatMobileRef?.value.deepChatRef.clearMessages()
    updateSessionId()
    updateChatRenderInstance()
  }

  const aiCustomPromptListenerHandler = (event) => {
    if (event.data.type === AZION_MESSAGE_TYPE) {
      helpCenterStore.open()
      azionAiChatRef?.value.deepChatRef.submitUserMessage({ text: event.data.prompt })
      setTimeout(() => {
        azionAiChatMobileRef?.value.deepChatRef.submitUserMessage({ text: event.data.prompt })
      }, 100)
    }
  }

  const openChatInNewTab = () => {
    const url = `${window.location.origin}${router.resolve({ name: 'copilot' }).path}`
    windowOpen(url, '_blank')
  }
</script>
