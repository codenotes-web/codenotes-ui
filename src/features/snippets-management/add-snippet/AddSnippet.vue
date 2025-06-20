<script setup lang="ts">
import Button from '@/core/ui/button/Button.vue'
import { Input } from '@/core/ui/input'
import Popover from '@/core/ui/popover/Popover.vue'
import { ref, watch } from 'vue'

const emit = defineEmits<{
  (e: 'new-snippet', name: string): void
}>()

const snippetInputRef = ref<InstanceType<typeof Input>>()
const snippetName = ref('')

watch(snippetInputRef, (snippetInput) => {
  snippetName.value = ''
  snippetInput?.focus()
})

const createSnippet = (onSuccess: () => void) => {
  emit('new-snippet', snippetName.value)
  onSuccess()
}

</script>

<template>
    <Popover>
        <template #trigger="{ doTrigger, initTriggerRef }">
            <Button size="xs" @click="doTrigger()" :ref="initTriggerRef">
                Add snippet
            </Button>
        </template>
        <template #content="{ doClose }">
            <div class="flex flex-row gap-2">
                <Input
                    @keydown.enter="createSnippet(doClose)"
                    ref="snippetInputRef"
                    v-model="snippetName"
                />
                <Button
                    @click="createSnippet(doClose)"
                    :disabled="!snippetName"
                >
                    create
                </Button>
            </div>
        </template>
    </Popover>
</template>
