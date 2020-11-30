function areActorsColliding(actor1, actor2)
{
    if(actor1 instanceof Actor && actor2 instanceof Actor)
    {
        var distance = getDistance(actor1.pos, actor2.pos);

        if(distance < (actor1.boundsRadius + actor2.boundsRadius))
        {
            return true;
        }

        return false;
    };
};

function getDistance(pos1, pos2)
{
    var aSqrd = Math.pow((pos1.x - pos2.x), 2);

    var bSqrd = Math.pow((pos1.y - pos2.y), 2);

    var distance = Math.sqrt(aSqrd + bSqrd);

    return distance;
}