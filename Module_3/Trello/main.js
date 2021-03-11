const app = new Vue({
    el: '#app',
    // tried to keep data minimal. holds quiz values, messages, style, and currentQuiz
    data() {
        return {
            projectData: trelloTemplate.tasks,
            task_name_list: ['To-Do: School Work', 'To-Do: House Work'],
            current_task_name: '',

        };
    },
    methods: {

    },
});

app.$mount('#app');
