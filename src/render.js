export const render = {
    list(list, $node) {
        list.forEach(name => {
            const $newOption = new Option(name, name);
            $node.append($newOption);
        });
    },
    
    price($node, price) {
        $node.textContent = `${price.toFixed(5)}$`;
    
        return true;
    },
    
    img(img, name, $url, $icon) {
        if (name.includes(' ')) {
            name = name.replaceAll(' ', '-');
        }
        name = name.toLowerCase();
        $url.setAttribute('href', `https://www.coingecko.com/en/coins/${name}`);
        $icon.setAttribute('src', img);
    
        return true;
    },
}