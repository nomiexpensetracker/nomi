'use client';

import { Camera } from 'lucide-react';
import React, { useState } from 'react';

import { useStore } from '@/lib/stores';

import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { Button } from '@/components/atoms/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group';

const PersonalInfoScreen: React.FC = () => {
  const { user: { data } } = useStore() 

  const [formData, setFormData] = useState({
    fullName: data?.name || 'John Doe',
    username: '@johndoe',
    gender: 'Male',
    birthday: '05-01-2001',
    phone: '(+880) 1759263000',
    email: data?.email || 'johndoe@gmail.com',
  });

  const handleSave = () => {
    // TODO: Implement save functionality
  };

  return (
    <>

      {/* Content */}
      <div className="px-6 py-6 space-y-6 mt-20">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" alt={formData.fullName} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {formData.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-muted-foreground text-background flex items-center justify-center shadow-lg">
              <Camera size={16} />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-black">{formData.fullName}</h2>
            <p className="text-sm text-muted-foreground">{formData.username}</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-muted-foreground text-xs">Full name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="bg-card border-border"
            />
          </div>

          {/* Gender and Birthday */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-muted-foreground text-xs">Gender</Label>
              <RadioGroup value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <div className="flex items-center space-x-2 bg-card border border-border rounded-md px-3 py-2.5">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male" className="flex-1 cursor-pointer text-foreground">Male</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthday" className="text-muted-foreground text-xs">Birthday</Label>
              <Input
                id="birthday"
                type="text"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                className="bg-card border-border"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-muted-foreground text-xs">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-card border-border"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground text-xs">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-card border-border"
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-muted-foreground text-xs">User name</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="bg-card border-border"
            />
          </div>
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSave}
          className="w-full h-12 text-base font-semibold"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default PersonalInfoScreen;
