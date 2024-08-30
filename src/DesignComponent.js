import {Card, CardContent,CardHeader,CardActions, IconButton, Button, Checkbox, FormControlLabel,Typography  } from '@mui/material';
import DiagramEditor from './DiagramEditor';

const DesignComponent = () => {
    return(
        <div className="mt-4">
            <Card>
            <CardActions>
                <Button size="small">Generate This</Button>
                <Button size="small">Generate Below</Button>
            </CardActions>
            <CardHeader
                title="Generated Design"
                subheader="Class Diagram"
            />
            <CardContent>
                <DiagramEditor/>
            </CardContent>
            </Card>
        </div>
    );
}

export default DesignComponent;