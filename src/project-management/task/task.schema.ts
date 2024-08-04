import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Project } from '../project/project.schema';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Project' })
  project: Project;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
export type TaskDocument = Task & Document;
