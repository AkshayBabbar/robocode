import rg

class Robot:
        
    def n_enemies(self, game):
        enemies = 0
        for location, bot in game.get('robots').items():
            if bot.get('player_id') != self.player_id:
                if 1 == rg.wdist(self.location, location):
                    enemies += 1
        return enemies
    
    def n_friends(self, game):
        friends = 0
        for location, bot in game.get('robots').items():
            if bot.get('player_id') == self.player_id:
                if 1 == rg.wdist(self.location, location):
                    friends += 1
        return friends
        
    def act(self, game):
    
        def mindist(robots, loc):
            return min(robots, key=lambda t: rg.dist(t, loc))
        
        all_locations = {(x, y) for x in xrange(19) for y in xrange(19)}
        obstacle_locations = {loc for loc in all_locations if 'obstacle' in rg.loc_types(loc)}
        spawn_locations = {loc for loc in all_locations if 'spawn' in rg.loc_types(loc)}
        allies = {loc for loc in game.robots if game.robots[loc].player_id == self.player_id}
        enemies = set(game.robots)-allies

        adjacent = set(rg.locs_around(self.location)) - obstacle_locations
        adjacent_enemy_double = {loc for loc in adjacent if (set(rg.locs_around(loc)) & enemies)} - allies
        adjacent_enemy = adjacent & enemies
        
        safe_zones = adjacent - adjacent_enemy - adjacent_enemy_double - spawn_locations - allies

        if enemies:
            closest_enemy = mindist(enemies, self.location)
        else:
            closest_enemy = rg.CENTER_POINT

        move = ['guard']

        if self.location in spawn_locations:
            if safe_zones:
                move = ['move', mindist(safe_zones, rg.CENTER_POINT)]
                
        elif adjacent_enemy:
            if 10*len(adjacent_enemy) >= self.hp:
                if safe_zones:
                    move = ['move', mindist(safe_zones, rg.CENTER_POINT)]
            else:
                move = ['attack', adjacent_enemy.pop()]
                
        elif adjacent_enemy_double:
            move = ['attack', adjacent_enemy_double.pop()]
            
        elif safe_zones:
            n_enemies = self.n_enemies(game)
            
            if n_enemies * 10 > self.hp:
                return ['suicide']

            MIN = float("inf")
            
            move_to = rg.CENTER_POINT
            
            for location, bot in game.get('robots').items():
            
                if bot.get('player_id') != self.player_id:
                    if rg.dist(location, self.location) <= 1:
                        return ['attack', location]
                        
                if bot.get('player_id') == self.player_id:
                    if rg.wdist(location, self.location) < MIN:
                        MIN = rg.wdist(location, self.location)
                        move_to = location
            if MIN < 2: 
                ####-----------fix this
                move_to = rg.CENTER_POINT
            
            if self.location == rg.CENTER_POINT
                return ['guard']

            if self.n_friends(game) > 1:
                return ['guard']
            
            return ['move', rg.toward(self.location, move_to)]
        else:
          move = ['suicide']
          
        return move