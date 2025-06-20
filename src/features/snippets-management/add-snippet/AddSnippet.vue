<script setup lang="ts">
import Button from '@/core/ui/button/Button.vue'
import { Input } from '@/core/ui/input'
import Popover from '@/core/ui/popover/Popover.vue'

</script>

<template>
    <Popover>
        <template #trigger="{ doTrigger, initTriggerRef }">
            <Button @click="doTrigger()" :ref="(el) => initTriggerRef(el)">
                add snippet
            </Button>
            <span @click="doTrigger()" :ref="(el) => initTriggerRef(el)">

            </span>
        </template>
        <template #content>
            <div>
                <!-- Focus on appear + enter click handle -->
                <Input />
            </div>
        </template>
    </Popover>
</template>
