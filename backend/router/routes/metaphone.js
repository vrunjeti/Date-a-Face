var vowels = function(c) {
	return (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c =='u');
};

var metaphone = function(word) {
    retval = "";
    current = 0;
    length = word.length;

    word = word.toLowerCase();
    
    if (word.substring(0,2) == 'kn' ||
            word.substring(0,2) == 'gn' ||
            word.substring(0,2) == 'pn' ||
            word.substring(0,2) == 'ae' ||
            word.substring(0,2) == 'wr') {
        retval += word[1];
        current += 1;
    }

    if (vowels(word[0])) {
        current += 1;
        retval += word[0];
    }

    while(current < length) {
        // drop duplicated adjacent letters, except for c
        if (current + 1 < length &&
                word[current] == word[current+1] &&
                word[current] != 'c'){
            current += 1;
            continue;
        }
        
        // drop b if after m at the end of the word
        if ((current == length - 2) && 
                word.substring(current,current+2) == 'mb') {
            retval += word[current];
            current += 2;
            continue;
        }

        // case c
        if (word[current] == 'c'){
            // c is followed by ia transforms to x
            if (current + 2 < length && word.substring(current,current+3) == 'cia'){
                retval += 'x';
                current += 3;
                continue;
            }

            // c is followed by h transforms to x 
            // unless part of -sch- sequence
            if (current + 1 < length) {
                if (current - 1 >= 0 && word.substring(current-1, current+2) == 'sch') {
                    retval += 'k';
                    current += 2;
                    continue;
                }
                if (word.substring(current, current+2) == 'ch'){
                    retval += 'x';
                    current += 2;
                    continue;
                }
            }

            // c is followed by i,e, || y transforms to s
            if (current + 1 < length && (
                word[current+1] == 'i' || 
                word[current+1] == 'e' ||
                word[current+1] == 'y')){
                retval += 's';
                current += 2;
                continue;
            }

            // otherwise, c transforms to k
            retval += 'k';
            current += 1;
            continue;
        }

        // case d
        if (word[current] == 'd'){
            // d is followed by ge,gi,gy turns into j
            if (current + 2 < length && (
                word.substring(current,current+3) == 'dge' ||
                word.substring(current,current+3) == 'dgi' ||
                word.substring(current,current+3) == 'dgy')){
                retval += 'j';
                current += 3;
                continue;
            }
            // otherwise, d transforms to t
            retval += 't';
            current += 1;
            continue;
        }
        
        // case g
        if (word[current] == 'g'){
            // drop g if followed by h and 
            // h is not at the end || followed by a vowel
            if (current + 2 < length && word[current+1] == 'h' && 
                    !vowels(word[current+2])){
                current += 1;
                continue;
            }
            
            // drop g if followed by n and is at the end
            if (current + 1 == length - 1 && word[current+1] == 'n'){
                current += 1;
                continue;
            }

            // drop g if followed by ned and is at the end
            if (current + 3 == length - 1 && word.substring(current,current+4) == 'gned'){
                current += 1;
                continue;
            }

            // g transforms to j if before i,e,y and not in -gg-
            if (current - 1 >= 0 && word[current-1] == 'g'){
                retval += 'k';
                current += 1;
                continue;
            }
            else if (current + 1 < length && (
                word[current+1] == 'i' ||
                word[current+1] == 'e' ||
                word[current+1] == 'y') ){
                retval += 'j';
                current += 1;
                continue;
            }
        }

        // case h after a vowel, drop
        if (current - 1 >= 0 && word[current] == 'h' && 
                vowels(word[current - 1])){
            // h is followed by a vowel, don't drop
            if (current + 1 < length && vowels(word[current+1])){
                current += 1;
                retval += 'h';
                continue;
            }
            // h is not followed by a vowel, drop
            if (current + 1 < length && !vowels(word[current+1])){
                current += 1;
                continue;
            }
        }

        // ck transforms to k
        if (word[current] == 'c' && 
                current + 1 < length && 
                word[current + 1] == 'k'){
            retval += 'k';
            current += 2;
            continue;
        }

        // ph transforms to f
        if (word[current] == 'p' &&
                current + 1 < length && 
                word[current + 1] == 'h') {
            retval += 'f';
            current += 2;
            continue;
        }

        // q transforms to k
        if (word[current] == 'q'){
            retval += 'k';
            current += 1;
            continue;
        }

        // s transforms to x if followed by h, io, ia
        if (word[current] == 's'){
            if (current + 1 < length && 
                    word[current+1] == 'h'){
                retval += 'x';
                current += 1;
                continue;
            }
            if (current + 2 < length && 
                    (word.substring(current,current+3) == 'sio' || 
                     word.substring(current,current+3) == 'sia')){
                retval += 'x';
                current += 1;
                continue;
            }
        }

        // case t
        if (word[current] == 't'){
            // transforms to x if followed by ia, io
            if (current + 2 < length && (
                word.substring(current,current+3) == 'tia' || 
                word.substring(current,current+3) == 'tio')){
                retval += 'x';
                current += 1;
                continue;
            }
            // transforms to 0 if followed by th
            if (current + 1 < length && word[current+1] == 'h'){
                retval += '0';
                current += 2;
                continue;
            }
            // drop t if followed by ch
            if (current + 2 < length && word.substring(current,current+3) == 'tch'){
                current += 1;
                continue;
            }
        }

        // v transforms to f
        if (word[current] == 'v'){
            retval += 'f';
            current += 1;
            continue;
        }
        
        // if wh is at the beginning, transforms to w
        if (current == 0 && word.substring(current,current+2) == 'wh'){
            retval += 'w';
            current += 2;
            continue;
        }
        // if w is not followed by a vowel, drop w
        if (word[current] == 'w' && current + 1 < length){
            if (vowels(word[current+1])){
                retval +='w';
            }
            current += 1;
            continue;
        }

        // case x
        if (word[current] == 'x'){
            if (current == 0){
                retval += 's';
            }
            else{
                retval += 'ks';
            }
            current += 1;
            continue;
        }
        
        // case y
        if (word[current] == 'y'){
            // drop y if not followed by a vowel
            if (current + 1 < length && vowels(word[current+1])){
                retval += 'y';
            }
            if (current == length-1) {
		        retval += 'ee';
		        current += 1;
		        continue;
	    	}
            current += 1;
            continue;
        }

        // case z
        if (word[current] == 'z'){
            retval += 's';
            current += 1;
            continue;
        }

        // case vowel, not in the beginning
        if (vowels(word[current])){
            current += 1;
            continue;
        }
        retval += word[current];
        current += 1;
    }
    return retval
};

var metaphrase = function(phrase) {
    var retval = "";
    var words = phrase.trim().split(/s+/);
    var phraseLength = words.length;
    for (var i = 0; i < phraseLength; ++i) {
        retval += metaphone(words[i]);
        retval += " ";
    }
    return retval;
};
