<template>
    <div class="login-container">
        <div class="left">
            <div class="login-wrapper">
                <div class="logo">
                    <img :src="brandLogoUrl" :style="{height: brandLogoHeight + 'px'}" alt />
                </div>
                <h1 class="title" :style="{color: textDarkColor}">
                    {{ titleText }}
                </h1>
                <h3 class="subtitle" :style="{color: textLightColor}">
                    {{ subTitleText }}
                </h3>
                <form class="login-form" @keyup.enter="() => onClickFn(username, password, errorMessage)">
                    <div class="form-group">
                        <label for="username" class="control-label" :style="{color: brandPrimary}">Username or Email</label>
                        <input id="username" v-model="username" type="text" class="form-control" placeholder="john@doe.com" />
                    </div>
                    <div class="form-group">
                        <label for="password" class="control-label" :style="{color: brandPrimary}">Password</label>
                        <input id="password" v-model="password" type="password" class="form-control" placeholder="••••••••" />
                    </div>
                    <div class="forgot-password">
                        <a :href="forgotPasswordLink" class="brand-primary bold" :style="{color: brandPrimary}">Forgot Password?</a>
                    </div>
                    <p class="login-info" :v-if="errorMessage">
                        {{ errorMessage }}
                    </p>
                    <Button size="lg" :color="brandPrimary" text="Login" :action="() => onClickFn(username, password, errorMessage)" :async="true" :disabled="isNotProceedable()">
                        <i class="material-icons">https</i>
                    </Button>
                </form>
            </div>
        </div>
        <div class="right" :style="{'background-image': 'url(' + backgroundImage + ')'}" />
    </div>
</template>

<script>
import Button from '../../../components/Button.vue';
export default {
    name: 'LoginVariation1',
    components: {
        Button
    },
    props: {
        brandPrimary: {
            type: String,
            default: '#000000'
        },
        brandLogoUrl: {
            type: String,
            default: 'https://htmlsigs.s3.amazonaws.com/logos/files/001/087/329/landscape/e9ineLogo.png'
        },
        brandLogoHeight: {
            type: String,
            default: '64'
        },
        titleText: {
            type: String,
            default: 'This is your title. Please try to fit it within two lines.'
        },
        subTitleText: {
            type: String,
            default: 'This is your sub-title. Please try to fit it within three lines.'
        },
        textDarkColor: {
            type: String,
            default: '#584649'
        },
        textLightColor: {
            type: String,
            default: '#777'
        },
        backgroundImage: {
            type: String,
            default: 'https://via.placeholder.com/2000x1200?text=Replace+This+Image+Now'
        },
        errorMessage: {
            type: String,
            default: null
        },
        isNotProceedable: {
            type: Function,
            default: () => false
        },
        onClickFn: {
            type: Function
        },
        forgotPasswordLink: {
            type: String,
            default: 'https://www.google.com'
        }
    },
    data() {
        return {
            username: null,
            password: null
        };
    }
};
</script>
