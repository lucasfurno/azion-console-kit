<template>
  <div
    class="flex flex-col surface-border border-l w-slide h-full fixed right-0 transform translate-x-full transition-transform duration-300 ease-in-out"
  >
    <!-- Title  -->
    <div
      class="flex flex-col w-full justify-between pl-6 md:pr-8 pr-3 py-3 border-b surface-border gap-6"
    >
      <div class="flex w-full gap-2 justify-between surface-border">
        <h3 class="text-color text-lg font-medium">Help Center</h3>
        <div class="flex gap-2">
          <PrimeButton
            icon="pi pi-external-link"
            outlined
            class="surface-border h-8 w-8"
            aria-label="Open copilot in a new tab"
            v-tooltip.bottom="'Open a chat in new tab'"
            @click="openChatInNewTab"
          />
          <PrimeButton
            icon="pi pi-times"
            outlined
            class="surface-border h-8 w-8"
            aria-label="Close"
            @click="helpCenterStore.close()"
          />
        </div>
      </div>

      <TabView
        :activeIndex="activeTab"
        :pt="{
          navContainer: 'mb-6'
        }"
      >
        <TabPanel :header="'Copilot'">
          <AzionAiChatBlock />
        </TabPanel>
        <TabPanel :header="'Documentation'">
          <DocumentationTab />
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script setup>
  import { useHelpCenterStore } from '@/stores/help-center'
  import DocumentationTab from './documentation.vue'
  import PrimeButton from 'primevue/button'
  import TabView from 'primevue/tabview'
  import TabPanel from 'primevue/tabpanel'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import AzionAiChatBlock from '@/modules/azion-ai-chat/index.vue'
  import { windowOpen } from '@/helpers'

  defineOptions({ name: 'SlideIn' })
  const activeTab = ref(0)
  const router = useRouter()

  const helpCenterStore = useHelpCenterStore()
  const openChatInNewTab = () => {
    const url = `${window.location.origin}${router.resolve({ name: 'copilot' }).path}`
    windowOpen(url, '_blank')
  }
</script>
