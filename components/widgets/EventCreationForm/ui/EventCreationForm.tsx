"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/shared/ui/textarea";
import { Button } from "@/components/shared/ui/button";
import {
  ImageUpload,
  DateTimePicker,
  TicketTypesForm,
  TagsSelector,
  AddCreators,
  AddPhotos,
  AddSchedule,
  AddLocation,
} from "@/components/features";
import { useEventCreation } from "@/components/features/EventCreation/hooks/useEventCreation";
// исправил путь к SCSS файлу
import styles from "@/components/pages/EventCreationPage/ui/styles.module.scss";

export const EventCreationForm: React.FC = () => {
  const {
    eventData,
    setEventData,
    ticketTypes,
    pending,
    successMessage,
    errorMessage,
    handleImageUpload,
    handlePhotoUpload,
    photos,
    handleDateTimeChange,
    handlePriceInput,
    addTicketType,
    removeTicketType,
    handleTicketTypeChange,
    handleCreateEvent,
    schedule,
    addScheduleItem,
    removeScheduleItem,
    handleScheduleChange,
    handleLocationSelect,
    handleDurationChange,
  } = useEventCreation();

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Image Upload */}
      <ImageUpload
        image={eventData.image}
        onImageUpload={handleImageUpload}
        className="w-full max-w-[300px] mx-auto mb-8"
      />

      {/* Form Fields */}
      <div className="space-y-4 px-2">
        {/* Name Field */}
        <div>
          <div className="w-full">
            <Textarea
              placeholder="введите название"
              value={eventData.name}
              onChange={(e) =>
                setEventData((prev) => ({
                  ...prev,
                  name: e.target.value.slice(0, 25),
                }))
              }
              className={cn("font-unbounded", styles.Input_h2)}
            />
          </div>
        </div>

        {/* Date and Time Field */}
        <DateTimePicker
          date={eventData.date}
          time={eventData.time}
          formattedDate={eventData.formattedDate}
          onDateTimeChange={handleDateTimeChange}
        />

        {/* Tags Field */}
        <div className="w-full">
          <TagsSelector eventData={eventData} setEventData={setEventData} />
        </div>

        {/* Description Field */}
        <div className="w-full">
          <Textarea
            placeholder="добавьте описание"
            value={eventData.description}
            onChange={(e) =>
              setEventData((prev) => ({
                ...prev,
                description: e.target.value.slice(0, 250),
              }))
            }
            className={cn("font-unbounded", styles.Input_h4)}
          />
        </div>

        {/* Price Field */}
        <div className="w-full flex justify-center">
          <div
            className={cn(
              "rounded-full bg-white py-4",
              "text-base font-medium text-gray-500",
              "whitespace-nowrap max-w-max"
            )}
          >
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="добавьте цену"
              value={eventData.price || ""}
              onChange={handlePriceInput}
              className={cn("font-unbounded text-black", styles.Input_numeric)}
            />
          </div>
        </div>
      </div>

      <div className="w-full py-3 px-2 bg-white/20">
        <AddPhotos photos={photos} onPhotosUpload={handlePhotoUpload} />
      </div>

      <div className="space-y-4 px-2">
        <h2 className="text-xl font-unbounded font-medium text-white">
          добавить расписание
        </h2>
        <AddSchedule
          schedule={schedule}
          onScheduleChange={handleScheduleChange}
          onAddScheduleItem={addScheduleItem}
          onRemoveScheduleItem={removeScheduleItem}
          onDurationChange={handleDurationChange}
        />
      </div>

      <div className="space-y-4 px-2">
        <h2 className="text-xl font-unbounded font-medium text-white">
          добавить локацию
        </h2>
        <AddLocation onLocationSelect={handleLocationSelect} />
      </div>

      {/* Ticket Types */}
      <TicketTypesForm
        ticketTypes={ticketTypes}
        onTicketTypeChange={handleTicketTypeChange}
        onAddTicketType={addTicketType}
        onRemoveTicketType={removeTicketType}
      />

      <div className="w-full space-y-4 px-2">
        <h2 className="text-xl font-unbounded font-medium text-white">
          Организатор
        </h2>
        <AddCreators />
      </div>

      {/* Create Event Button */}
      <div className="w-full px-2">
        <Button
          className={cn(
            "w-full bg-orange-500 hover:bg-orange-600 text-white py-3",
            pending && "opacity-70 cursor-not-allowed"
          )}
          onClick={handleCreateEvent}
          disabled={pending}
        >
          {pending ? "Создание..." : "Создать событие"}
        </Button>

        {/* Messages */}
        {successMessage && (
          <p className="mt-3 text-green-500 text-sm font-medium">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="mt-3 text-red-500 text-sm font-medium">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};
