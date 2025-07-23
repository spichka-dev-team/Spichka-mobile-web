import type React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";

export const EventPageSkeleton: React.FC = () => {
  const pulseAnimation = {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <main
        className={cn(styles.EventPage)}
        style={{
          marginTop: "80px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.5rem",
          padding: "1rem",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 20,
            width: "100%",
            aspectRatio: "4/5",
            borderRadius: "1rem",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(4px)",
            ...pulseAnimation,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              height: "1.75rem",
              backgroundColor: "#d1d5db",
              borderRadius: "0.5rem",
              width: "12rem",
              ...pulseAnimation,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "1rem",
                backgroundColor: "#d1d5db",
                borderRadius: "0.25rem",
                width: "4rem",
                ...pulseAnimation,
              }}
            />
            <div
              style={{
                width: "0.25rem",
                height: "0.25rem",
                borderRadius: "50%",
                backgroundColor: "#d1d5db",
              }}
            />
            <div
              style={{
                height: "1rem",
                backgroundColor: "#d1d5db",
                borderRadius: "0.25rem",
                width: "5rem",
                ...pulseAnimation,
              }}
            />
            <div
              style={{
                width: "0.25rem",
                height: "0.25rem",
                borderRadius: "50%",
                backgroundColor: "#d1d5db",
              }}
            />
            <div
              style={{
                height: "1rem",
                backgroundColor: "#d1d5db",
                borderRadius: "0.25rem",
                width: "3.5rem",
                ...pulseAnimation,
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 20,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "2rem",
              backgroundColor: "#d1d5db",
              borderRadius: "9999px",
              padding: "0.5rem 1rem",
              width: "6rem",
              ...pulseAnimation,
            }}
          />
          <div
            style={{
              height: "2rem",
              backgroundColor: "rgba(209, 213, 219, 0.5)",
              borderRadius: "9999px",
              padding: "0.5rem 1rem",
              width: "5rem",
              ...pulseAnimation,
            }}
          />
          <div
            style={{
              height: "2rem",
              backgroundColor: "rgba(209, 213, 219, 0.5)",
              borderRadius: "9999px",
              padding: "0.5rem 1rem",
              width: "4rem",
              ...pulseAnimation,
            }}
          />
          <div
            style={{
              height: "2rem",
              backgroundColor: "rgba(209, 213, 219, 0.5)",
              borderRadius: "9999px",
              padding: "0.5rem 1rem",
              width: "4.5rem",
              ...pulseAnimation,
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 20,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              height: "1rem",
              backgroundColor: "#d1d5db",
              borderRadius: "0.25rem",
              width: "100%",
              ...pulseAnimation,
            }}
          />
          <div
            style={{
              height: "1rem",
              backgroundColor: "#d1d5db",
              borderRadius: "0.25rem",
              width: "100%",
              ...pulseAnimation,
            }}
          />
          <div
            style={{
              height: "1rem",
              backgroundColor: "#d1d5db",
              borderRadius: "0.25rem",
              width: "75%",
              ...pulseAnimation,
            }}
          />
          <div
            style={{
              height: "1rem",
              backgroundColor: "#d1d5db",
              borderRadius: "0.25rem",
              width: "100%",
              ...pulseAnimation,
            }}
          />
          <div
            style={{
              height: "1rem",
              backgroundColor: "#d1d5db",
              borderRadius: "0.25rem",
              width: "83.333333%",
              ...pulseAnimation,
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 20,
            maxWidth: "20rem",
            width: "100%",
            height: "fit-content",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(4px)",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "1.25rem",
          }}
        >
          <button
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              height: "100%",
              padding: "1rem 2rem",
              borderRadius: "9999px",
              fontFamily: "Unbounded, sans-serif",
              fontWeight: "500",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            купить билет!
          </button>
          <span
            style={{
              fontFamily: "Geologica, sans-serif",
              fontWeight: "700",
              fontSize: "1.125rem",
              color: "#ffffff",
            }}
          >
            ₸
          </span>
        </div>
      </main>
    </>
  );
};
