const trelloTemplate = {
    name: 'templateProject',
    'background-color': 'gray',

    tasks: [
        {
            name: 'To-Do: School Work',
            cards: [
                {
                    cardid: '1',
                    description: 'this is the first card',
                    duedate: '03/05/2021',
                    comments: ['comment1', 'comment2', 'comment3'],
                    tags: ['duke', 'homework', 'cs'],
                },
                {
                    cardid: '2',
                    description: 'this is the second card',
                    duedate: '03/05/2021',
                    comments: ['comment1', 'comment2', 'comment3'],
                    tags: ['duke', 'project', 'cs'],

                },
                {
                    cardid: '3',
                    description: 'this is the third card',
                    duedate: '03/09/2021',
                    comments: ['comment1', 'comment2', 'comment3'],
                    tags: ['duke', 'homework', 'stats'],

                },
            ],
        },
        {
            name: 'To-Do: House Work',
            cards: [
                {
                    cardid: '1',
                    description: 'Wash the dishes',
                    duedate: '3/06/2021',
                    comments: ['finish by 3pm', 'dry dishes in dishwasher'],
                    tags: ['home', 'chores', 'urgent'],
                },
                {
                    cardid: '2',
                    description: 'Do the laundry',
                    duedate: '3/06/2021',
                    comments: ['finish ASAP'],
                    tags: ['home', 'chores', 'urgent'],
                },
            ],
        },
    ],

};
