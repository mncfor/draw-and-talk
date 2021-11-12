<template>
    <div class="draw">
        <div class="draw__head">
            <Nav
                :user="user"
                @signIn="signIn"
                @signOut="signOut"
            />
            <Toolbar/>
        </div>
        <div class="draw__body">
            <div class="draw__canvas">
                <Canvas/>
            </div>
            <div class="draw__chat">
                <Chat/>
            </div>
        </div> 
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Toolbar from '@/components/Toolbar.vue'
import Canvas from '@/components/Canvas.vue'
import Chat from '@/components/Chat.vue'

export default {
    components: {
        Canvas,
        Toolbar,
        Nav,
        Chat
    },
    props: {
        session: {
            type: String,
            required: true
        }
    },
    computed: {
        user(){
            return this.$store.state.user
        }
    },
    methods: {
        signIn(name){
            this.$store.dispatch('signIn', name);
        },
        signOut(){
            this.$store.dispatch('signOut');
            this.$router.push({ name: 'Home' })
        },
    }
}
</script>
