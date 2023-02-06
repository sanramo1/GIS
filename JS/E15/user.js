const users = [
    {username: 'ppc90', age: 30, premium: false},
    {username: 'lu65', age: 24, premium: true},
    {username: 'maria3', age: 36, premium: false},
    {username: 'abc123', age: 30, premium: false},
    {username: 'sergio58', age: 30, premium: true},
];

const premiumUsers = users.filter(function(user) {
    return user.premium == true
});

for (const i of premiumUsers){
    console.log('El usuario ' + i.username + ' es premium')
};

const otherUsers = users.filter(function(user) {
    return user.premium == false;
});

// console.log(otherUsers);

for (const i of otherUsers){
    console.log('El usuario ' + i.username + ' no es premium')
};
