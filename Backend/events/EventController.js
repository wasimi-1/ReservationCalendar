const Event = require("./Event");

exports.createEvent = async (req, res) => {
    try {
        const {title, start} = req.body;
        const event = await Event.create({title, start});
        res.json({message: "Event created successfully", event});
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


exports.updateEvent = async (req, res) => {
    //==============
    try {
        const foundEvent = await Event.findByPk(req.body.Identifier);
        if (foundEvent !== null) {
            if (foundEvent.title === 'Wolne'){
                try{
                    foundEvent.title = req.body.title;
                    await foundEvent.save();
                }
                catch (e) {
                    res.error('Error updating event' + e);
                }


                const events = await Event.findAll();
                return res.json(events);
            }
            else {res.error("Error w updateEvent - Termin zajety")};

            const events = await Event.findAll();
            return res.json(events);
        }
        else
            return res.error("updateEvent - No");
    //==============
    } catch
        (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


exports.editEvent = async (req, res) => {
   
    //==============
    try {
        const foundEvent = await Event.findByPk(req.body.Identifier);
        if (foundEvent !== null) {
                try{
                    foundEvent.title = req.body.title;
                    await foundEvent.save();
                }
                catch (e) {
                    res.error('Error updating event' + e);
                }

                const events = await Event.findAll();
                return res.json(events);
        }
        else
            return res.error("updateEvent - No");
    //==============
    } catch
        (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


exports.deleteEvent = async (req, res) => {
   
    //==============
    try {
        const foundEvent = await Event.findByPk(req.body.Identifier);
        if (foundEvent !== null) {
                try{
                    foundEvent.title = 'Wolne';
                    console.error('testig');
                    await foundEvent.save();
                }
                catch (e) {
                    res.error('Error updating event' + e);
                }

                const events = await Event.findAll();
                return res.json(events);
        }
        else
            return res.error("updateEvent - No");
    //==============
    } catch
        (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

exports.createMockEvents = async (req, res) => {
    const events = await Event.findAll();
    if (events.length > 0) {
        return res.json(events);
    }
    console.log("Creating mock events");

    const startDate = new Date(2024, 11, 1);

    //Inaczej za niecaly miesiac koncza sie eventy, zle wyglada
    const endDate = new Date(2024, 11, 30);

    // await Event.create({Identifier: 1, title: 'Wolne', start: startDate, end: startDate});

    try {
        for (let date = new Date(startDate); date < endDate; date.setDate(date.getDate() + 1)) {
            date.setUTCHours(8);
            let endHour = new Date(date.toISOString())


            for (let i = 0; i < 8; i++) {
                date.setUTCHours(date.getUTCHours() + 1);
                endHour.setUTCHours(date.getUTCHours() + 1);
                await Event.build({title: 'Wolne', start: date.toISOString(), end: endHour.toISOString()}).save();
            }

        }
        const events = await Event.findAll();
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}