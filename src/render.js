export const render = {
    renderList(list, $node) {
        list.forEach(name => {
            const $newOption = new Option(name, name);
            $node.append($newOption);
        });
    },
    
    getPrice(data, amount) {
        const price = data.market_data.current_price.usd * amount;
    
        return price;
    },
      
    getImg(data) {
        const img = data.image.thumb;
    
        return img;
    },
    
    renderPrice($node, price) {
        $node.textContent = `${price.toFixed(5)}$`;
    
        return true;
    },
    
    renderImg(img, name, $url, $icon) {
        if (name.includes(' ')) {
            name = name.replaceAll(' ', '-');
        }
        name = name.toLowerCase();
        $url.setAttribute('href', `https://www.coingecko.com/en/coins/${name}`);
        $icon.setAttribute('src', img);
    
        return true;
    },
}