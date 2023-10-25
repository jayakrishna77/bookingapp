const { lock, unLock } = require('./vault');

const password = "thisisastrongpassword123"

const obj = {
    name: "Jaya",
    age: 27,
    city: "Tenali",
    country: "India"
}

const person = lock(obj, password);
person.fevColor = "red"
person.fevItem = "Food"

const unlocking = unLock(person, password);

const makeReactive = (object, observer) => {
    return new Proxy(object, {
        set(target, key, value) {
            observer({ [key]: value });
            return (target[key] = value);
        }
    })
}

const reactive = makeReactive({}, res => console.log(res));
reactive.color = "red";

console.log(unlocking);