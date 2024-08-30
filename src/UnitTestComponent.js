import {Card, CardContent,CardHeader,CardActions, IconButton, Button, Checkbox, FormControlLabel,Typography  } from '@mui/material';

const UnitTestComponent = () => {
    return(
        <div className="mt-4">
          <Card>
            <CardActions>
              <Button size="small">Generate This</Button>
              <Button size="small">Generate Below</Button>
            </CardActions>
            <CardHeader
              title="Generated Unit Tests"
              subheader="August 28, 2024"
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
              {/* You would replace this with actual generated content */}
            </CardContent>
          </Card>
        </div>
    );
}

export default UnitTestComponent;