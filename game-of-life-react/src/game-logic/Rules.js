class Rules {
    static survivesThisGeneration(cell, neighbors) {
        let livingNeighbors = this.countLiving(neighbors);

        if(this.isEquilibrious(livingNeighbors)) {
            return cell.alive;
        }

        if(this.isVivacious(livingNeighbors)) {
            return true;
        }

        return false;

    }

    static isUnderpopulated(livingNeighbors) {
        return livingNeighbors < 2
    }

    static isOverpopulated(livingNeighbors) {
        return livingNeighbors > 3;
    }

    static isEquilibrious(livingNeighbors) {
        return livingNeighbors === 2;
    }

    static isVivacious(livingNeighbors) {
        return livingNeighbors === 3;
    }

    static countLiving(neighbors) {
        if(!neighbors) {
            return 0;
        }

        let living = 0;
        neighbors.forEach((cell) => {
            if(cell.alive) {
                living++;
            }
        });
        return living;
    }
}

module.exports = Rules;