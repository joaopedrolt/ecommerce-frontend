<template>
    <div class="payment-footer mt-13">
        <v-divider color="#111111"></v-divider>
        <v-breadcrumbs class="text-caption text-center justify-center" style="justify-content: center !important;"
            :items="baseboardLinks" divider="-" />
    </div>
</template>

<script setup>
const baseboardLinks = [
    {
        title: "Política de reembolso",
        disabled: false,
        href: "breadcrumbs_dashboard",
    },
    {
        title: "Política de frete",
        disabled: false,
        href: "breadcrumbs_dashboard",
    },
    {
        title: "Política de privacidade",
        disabled: false,
        href: "breadcrumbs_dashboard",
    },
    {
        title: "Termos de serviço",
        disabled: false,
        href: "breadcrumbs_dashboard",
    }
];
</script>