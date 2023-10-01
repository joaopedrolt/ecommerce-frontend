<template>
    <v-footer elevation="10">
        <div class="footer-container">
            <div class="footer-row left-row">
                <div class="footer-column brand-field">
                    <div class="column-title">
                        ECOMMERCE
                    </div>
                    <div class="column-components">
                        <div class="text-caption">
                            Há mais de 10 anos no mercado, a Ellos Design tem como um de seus principais pilares, o
                            compromisso
                            em gerar resultados de qualidade, de maneira prática e efetiva aos nossos clientes por todo o
                            Brasil.
                        </div>
                        <div style="display: flex; margin-left: -8px;">
                            <v-btn size="x-small" variant="text" icon="mdi-instagram" :ripple="false" />
                            <v-btn size="x-small" variant="text" icon="mdi-facebook" :ripple="false" />
                            <v-btn size="x-small" variant="text" icon="mdi-twitter" :ripple="false" />
                        </div>
                    </div>
                </div>
                <div class="footer-column footer-list">
                    <div class="column-title list-title">
                        Section 2
                    </div>
                    <div class="column-list">
                        <v-list class="column-list-wrapper" variant="plain">
                            <v-list-item class="column-list-item" density href="https://www.google.com/" :ripple="false">
                                <div class="text-caption">
                                    Loja
                                </div>
                            </v-list-item>
                            <v-list-item class="column-list-item" density href="https://www.google.com/" :ripple="false">
                                <div class="text-caption">
                                    Mac
                                </div>
                            </v-list-item>
                            <v-list-item class="column-list-item" density href="https://www.google.com/" :ripple="false">
                                <div class="text-caption">
                                    iPad
                                </div>
                            </v-list-item>
                            <v-list-item class="column-list-item" density href="https://www.google.com/" :ripple="false">
                                <div class="text-caption">
                                    iPhone
                                </div>
                            </v-list-item>
                            <v-list-item class="column-list-item" density href="https://www.google.com/" :ripple="false">
                                <div class="text-caption">
                                    Watch
                                </div>
                            </v-list-item>
                        </v-list>
                    </div>
                </div>
            </div>
            <div class="footer-row right-row">
                <div class="footer-column footer-list">
                    <div class="column-title list-title">
                        Section 3
                    </div>
                    <div class="column-list">
                        <v-list class="column-list-wrapper" variant="plain">
                            <v-list-item class="column-list-item" density href="https://www.google.com/" :ripple="false">
                                <div class="text-caption">
                                    Loja
                                </div>
                            </v-list-item>
                            <v-list-item class="column-list-item" density href="https://www.google.com/" :ripple="false">
                                <div class="text-caption">
                                    Mac
                                </div>
                            </v-list-item>
                            <v-list-item class="column-list-item" density href="https://www.google.com/" :ripple="false">
                                <div class="text-caption">
                                    iPad
                                </div>
                            </v-list-item>
                            <v-list-item class="column-list-item" density href="https://www.google.com/" :ripple="false">
                                <div class="text-caption">
                                    iPhone
                                </div>
                            </v-list-item>
                            <v-list-item class="column-list-item" density href="https://www.google.com/" :ripple="false">
                                <div class="text-caption">
                                    Watch
                                </div>
                            </v-list-item>
                        </v-list>
                    </div>
                </div>
                <div class="footer-column newsletter">
                    <div class="newsletter-column-wrapper ">
                        <div class="column-title">
                            Newsletter
                        </div>
                        <div class="column-components">
                            <div class="text-caption">
                                Cadastre seu e-mail e receba novidades!
                            </div>

                            <v-text-field v-model="newsletterEmailInputValue" density hide-details="auto" variant="outlined"
                                placeholder="Digite seu E-mail">
                            </v-text-field>

                            <v-btn color="primary" size="x-small" variant="flat">
                                Cadastrar
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-footer>
</template>
   
<script setup>
import { ref } from 'vue';

const newsletterEmailInputValue = ref('');
</script>
   
<style lang="scss">
@import '@/styles/global.scss';

.footer-container {
    height: 100%;
    width: 100%;
    display: flex;

    .footer-row {
        display: flex;
        flex: 1;

        .footer-column {
            flex: 1;
            margin-bottom: 5px;

            .column-title {
                margin-bottom: 5px;

                &.list-title {
                    text-align: center;
                }
            }

            .column-list {
                .column-list-wrapper {
                    padding: 0 !important;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .column-list-item {
                        padding: 0 !important;
                        width: 65px;
                    }
                }
            }

            .column-components {
                display: flex;
                flex-direction: column;
                gap: 5px;
                width: 270px;
            }

            &.newsletter {
                display: flex;
                flex-direction: column;
                align-items: end;
                margin-left: 40px;

                .newsletter-column-wrapper {
                    width: 270px;
                }
            }

            &.brand-field {
                margin-right: 25px;
            }

            &.newsletter,
            &.brand-field {
                .text-caption {
                    color: $color-gray;
                }
            }
        }
    }

    @media (max-width: $breakpoint) {
        flex-direction: column !important;
        gap: 5px;

        .footer-row {
            flex-wrap: wrap;

            .footer-list {
                min-width: 117px;
            }

            &.left-row {

                .brand-field {
                    margin-right: 90px !important;
                }
            }

            &.right-row {
                flex-direction: row-reverse !important;

                .newsletter {
                    align-items: start !important;
                    margin-left: 0px !important;
                    margin-right: 90px;
                }
            }

            .column-title {
                &.list-title {
                    text-align: start !important;
                }
            }

            .column-list {
                .column-list-wrapper {
                    align-items: start !important;
                }
            }
        }
    }
}
</style>